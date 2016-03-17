/* sico-unit-5-canvas-hw.js */

/* This JavaScript file contains drawing functions for the HTML5 Canvas element. The functions are GetCanvasAndContext(), FillCanvas(), DrawLine(), DrawRectangle(), DrawTriangle(), DrawCircle(), DrawText(), DrawPicture(), DrawLinearGradient(), DrawRadialGradient() */

/* Identify the Canvas object in the document and get the context upon which to draw. Return the context. */
function GetCanvasAndContext(id) {

    var cnv = document.getElementById(id);
    var ctx = cnv.getContext("2d");
    return (ctx);

}

/* Color the Canvas object by setting the fillStyle property to the fillColor value and calling the fillRect method with the x and y coordinates and width and height dimensions. */
function FillCanvas(ctx, fillColor, x, y, width, height) {

    ctx.fillStyle = fillColor;
    ctx.fillRect(x, y, width, height);

}

/* Draw a line on the Canvas object by setting the strokeStyle property to the color value, the lineWidth property to the lineWidth value and call the moveTo method to set the start of the line at the xMove and yMove coordinates and the lineTo method to set the end of the line at the xLine and yLine coordinates.  Set the lineCap property, the line end style, to the lineCap value.  Call the stroke method to draw the line. */
function DrawLine(ctx, color, lineWidth, xMove, yMove, xLine, yLine, lineCap) {

    ctx.strokeStyle = color;
    ctx.lineWidth =  lineWidth;
    ctx.moveTo(xMove, yMove);
    ctx.lineTo(xLine, yLine);
    ctx.lineCap = lineCap;
    ctx.stroke();

}

/* Draw a rectangle on the Canvas object by setting the strokeStyle property to the color value, the lineWidth property to the lineWidth value, and the fillStyle property to the fillStyle value.  Color the rectangle with the fillStyle property value by calling the fillRect method with the x and y coordinates and width and height dimensions.  Draw the rectangle with the strokeRect Method from the x and y coordinates to the width and height dimensions that has a line width the value of lineWidth property and a line color the value of the strokeStyle property. */
function DrawRectangle(ctx, color, lineWidth, fillColor, x, y, width, height) {

    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.fillStyle = fillColor;
    ctx.fillRect(x, y, width, height);
    ctx.strokeRect(x, y, width, height);

}

/* Draw a triangle by setting the lineJoin property, the style of the corners of the triangle, to the lineJoin value, calling the moveTo method to set the start of the line at the xMove and yMove coordinates and the lineTo method to set the end of the line at the xLine and yLine coordinates, and calling closePath to close the triangle by drawing a line back to the starting point.  Set the fillyStyle property to the fillColor value and call the fill method to color the triangle.  Set the lineWidth property to the lineWidth value and strokeStyle to the color value and call the stroke method the draw the triangle using the specified line width and color. */
function DrawTriangle(ctx, color, lineWidth, fillColor, lineJoin, xMove, yMove, xLeftSide, yLeftSide, xRightSide, yRightSide) {

    ctx.lineJoin = lineJoin;
    ctx.moveTo(xMove, yMove);
    ctx.lineTo(xLeftSide, yLeftSide);
    ctx.lineTo(xRightSide, yRightSide);
    ctx.closePath();
    ctx.fillStyle = fillColor;
    ctx.fill();
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = color;
    ctx.stroke();

}

/* Draw a circle by setting the fillStyle property to the fillColor value, calling the arc method to draw the outline of the circle with the x and y center coordinates, the radius, the starting angle in radians (0 is at the 3 o'clock position of the arc's circle), the ending angle in radians, and an optional clockDirection flag to set the drawing direction that is true for clockwise and the default false for counter-clockwise, and calling the fill method to color the circle with the fillStyle property color value. */
function DrawCircle(ctx, fillColor, x, y, radius, startAngle, endingAngle, clockDirection) {

   ctx.fillStyle = fillColor;
   ctx.arc(x, y, radius, startAngle, endingAngle, clockDirection);
   ctx.fill();

}

/* Draw text by setting the lineWidth property to the lineWidth value, setting the font property to the font values abd setting the textAlign property to the textAlign value.  If the fillFlag is true, set the fillStyle property to the color value and use the fillText method to draw the text value string in the solid fillStyle color value starting at the x and y coordinates subject to the textAlign property value, otherwise set the strokeStyle property to the color value and call the strokeText method to draw the outline in the strokeStyle property color of the text tring value at the x and y coordinates subject to the textAlign property value. */
function DrawText(ctx, color, lineWidth, font, textAlign, text, x, y, fillFlag) {

    ctx.lineWidth = lineWidth;
    ctx.font = font;
    ctx.textAlign = textAlign;

    if (fillFlag) {
        ctx.fillStyle = color;
        ctx.fillText(text, x, y);
    }
    else {
        ctx.strokeStyle = color;
        ctx.strokeText(text, x, y);
    }

}

/* Draw a picture by creating an image object using the Image Element Constructor, new Image(), setting the src property of the new image (picture) to the image value, and calling the onload method (in order for the script to place the images on the canvas, the image must first be loaded into the browser) set to the Canvas object context method drawImage.  The drawImage method draws the picture at the x and y coordinates using the width and height dimensions that can be scaled up or down depending on the scaleFactor. */
function DrawPicture(ctx, image, x, y, scaleFactor) {

    var picture = new Image();
    picture.src = image;
    picture.onload = function() {
        ctx.drawImage(picture, x, y, picture.width*scaleFactor, picture.height*scaleFactor);
    }

}

/* Draw a linear gradient by first creating a linear gradient object with the createLinearGradient method using xStart, yStart, xEnd, and yEnd to set the coordinates of the gradient. Call the addColorStop method using a for loop to set the colors in the color array and the offsets (positions) in the offset array in the gradient object.  Set the fillStyle property to the gradient object and call the fillRect method to draw the rectangle with the gradient. */
function DrawLinearGradient(ctx, xStart, yStart, xEnd, yEnd, offset, color, x, y, width, height) {

    var gradient = ctx.createLinearGradient(xStart, yStart, xEnd, yEnd);

    var index;
    for (index = 0; index < offset.length; index++)
        gradient.addColorStop(offset[index], color[index]);
    ctx.fillStyle = gradient;
    ctx.fillRect(x, y, width, height);

}

/* Draw a radial gradient by first creating a radial gradient object with the createRadialGradient method using xStart, yStart, radiusStart, xEnd, radiusEnd, and yEnd to set the coordinates of the gradient. Call the addColorStop method using a for loop to set the colors in the color array and the offsets (positions) in the offset array in the gradient object.  Set the fillStyle property to the gradient object and call the fillRect method to draw the rectangle with the gradient. */
function DrawRadialGradient(ctx, xStart, yStart, radiusStart, xEnd, yEnd, radiusEnd, offset, color, x, y, width, height) {

    var gradient = ctx.createRadialGradient(xStart, yStart, radiusStart, xEnd, radiusEnd, yEnd);

    var index;
    for (index = 0; index < offset.length; index++)
        gradient.addColorStop(offset[index], color[index]);

    ctx.fillStyle = gradient;
    ctx.fillRect(x, y, width, height);

}