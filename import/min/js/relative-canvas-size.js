var relativeSize=1,canvas=document.createElement("canvas"),context=canvas.getContext("2d");function getRelativeSize(a){return a*relativeSize}function updateRelativeSize(a){if(a){var b=relativeSize;updateRelativeSize();if(relativeSize!=b)for(i in b=relativeSize/b,a)a[i].multiply(b)}else relativeSize=Math.sqrt(canvas.width*canvas.height,2)/100;return relativeSize};
