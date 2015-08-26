// Go to the end of the file to see the example

/// START OF THE mltext.js LIBRARY
// Library: mllib.js
// Desciption: Extends the CanvasRenderingContext2D that adds two functions: mlFillText and mlStrokeText.
//
// The prototypes are:
//
// function mlFillText(text,x,y,w,h,vAlign,hAlign,lineheight);
// function mlStrokeText(text,x,y,w,h,vAlign,hAlign,lineheight);
//
// Where vAlign can be: "top", "center" or "button"
// And hAlign can be: "left", "center", "right" or "justify"
// Author: Jordi Baylina. (baylina at uniclau.com)
// License: GPL
// Date: 2013-02-21

function mlFunction(text, x, y, w, h, hAlign, vAlign, lineheight, fn) {

    // The objective of this part of the code is to generate an array of words. 
    // There will be a special word called '\n' that indicates a separation of paragraphs.
    text = text.replace(/\r/g, '');
    var words = [];
    var inLines = text.split('\n');
    var i;
    for (i=0; i < inLines.length; i++)
    {
    	if (i) words.push('\n');
    	words = words.concat( inLines[i].split(' ') );
    }
    // words now contains the array.


    // Next objective is generate an array of lines where each line has a property 
    // called Words with all the words that fits in the line. Each word contains 2 fields:
    // .word for the actual word and .l for the length o the word.
    // If the line is the last line of a paragraps, the property EndOfParagraph will be true
    var sp = this.measureText(' ').width;
    var lines = [];
    var actualline = 0;
    var actualsize = 0;
    var wo;
    lines[actualline] = {};
    lines[actualline].Words = [];
    i = 0;
    while (i < words.length) {
        var word = words[i];
        if (word == "\n") {
            lines[actualline].EndParagraph = true;
            actualline++;
            actualsize = 0;
            lines[actualline] = {};
            lines[actualline].Words = [];
            i++;
        } else {
            wo = {};
            wo.l = this.measureText(word).width;
            if (actualsize === 0) {

                // If the word does not fit in one line, we split the word
                while (wo.l > w) {
                    word = word.slice(0, word.length - 1);
                    wo.l = this.measureText(word).width;
                }

                wo.word = word;
                lines[actualline].Words.push(wo);
                actualsize = wo.l;
                if (word != words[i]) {
                    // if a single letter does not fit in one line, just return without painting nothing.
                    if (word === "") return;
                    words[i] = words[i].slice(word.length, words[i].length);
                } else {
                    i++;
                }
            } else {
                if (actualsize + sp + wo.l > w) {
                    lines[actualline].EndParagraph = false;
                    actualline++;
                    actualsize = 0;
                    lines[actualline] = {};
                    lines[actualline].Words = [];
                } else {
                    wo.word = word;
                    lines[actualline].Words.push(wo);
                    actualsize += sp + wo.l;
                    i++;
                }
            }
        }
    }
    if (actualsize === 0) lines.pop(); // We remove the last line if we have not added any thing here.

    // The last line will be allways the last line of a paragraph even if it does not end with a  /n
    lines[actualline].EndParagraph = true;


    // Now we remove any line that does not fit in the heigth.
    var totalH = lineheight * lines.length;
    while (totalH > h) {
        lines.pop();
        totalH = lineheight * lines.length;
    }

    // Now we calculete where we start draw the text.
    var yy;
    if (vAlign == "bottom") {
        yy = y + h - totalH + lineheight;
    } else if (vAlign == "center") {
        yy = y + h / 2 - totalH / 2 + lineheight;
    } else {
        yy = y + lineheight;
    }

    var oldTextAlign = this.textAlign;
    this.textAlign = "left"; // we will draw word by word.

	var maxWidth = 0;
    for (var li in lines) {
    	if (!lines.hasOwnProperty(li)) continue;
        var totallen = 0;
        var xx, usp;


        for (wo in lines[li].Words) {
            if (!lines[li].Words.hasOwnProperty(wo)) continue;
            totallen += lines[li].Words[wo].l;
        }
        // Here we calculate the x position and the distance betwen words in pixels 
        if (hAlign == "center") {
            usp = sp;
            xx = x + w / 2 - (totallen + sp * (lines[li].Words.length - 1)) / 2;
        } else if ((hAlign == "justify") && (!lines[li].EndParagraph)) {
            xx = x;
            usp = (w - totallen) / (lines[li].Words.length - 1);
        } else if (hAlign == "right") {
            xx = x + w - (totallen + sp * (lines[li].Words.length - 1));
            usp = sp;
        } else { // left
            xx = x;
            usp = sp;
        }
        for (wo in lines[li].Words) {
	    	if (!lines[li].Words.hasOwnProperty(wo)) continue;
            if (fn == "strokeText" || fn=="fillStrokeText") {
                this.strokeText(lines[li].Words[wo].word, xx, yy);
            }
            if (fn == "fillText" || fn=="fillStrokeText") {
                this.fillText(lines[li].Words[wo].word, xx, yy);
            }
            xx += lines[li].Words[wo].l + usp;
        }
        maxWidth = Math.max(maxWidth, xx);
        yy += lineheight;
    }
    this.textAlign = oldTextAlign;

    return {
    	width: maxWidth,
    	height: totalH,
    };
}

(function mlInit() {
    CanvasRenderingContext2D.prototype.mlFunction = mlFunction;

    CanvasRenderingContext2D.prototype.mlFillText = function (text, x, y, w, h, vAlign, hAlign, lineheight) {
        return this.mlFunction(text, x, y, w, h, hAlign, vAlign, lineheight, "fillText");
    };

    CanvasRenderingContext2D.prototype.mlStrokeText = function (text, x, y, w, h, vAlign, hAlign, lineheight) {
        return this.mlFunction(text, x, y, w, h, hAlign, vAlign, lineheight, "strokeText");
    };

    CanvasRenderingContext2D.prototype.mlFillStrokeText = function (text, x, y, w, h, vAlign, hAlign, lineheight) {
        return this.mlFunction(text, x, y, w, h, hAlign, vAlign, lineheight, "fillStrokeText");
    };

})();
