define(function(require) {

    var data, root, grid, width, height, gutter;
    var matrix = [];
    var maped = {};

    function init(options) {
        root = options.root;
        grid = options.grid;
        gutter = options.gutter;
        width = grid[0];
        height = grid[1];
        renderNewData(options.data);
    }

    function initMatrix() {
        console.log("--------------- NEW -----------------");
        matrix = [];
        for(var i = 0, ii = width; i < ii; i++){
            var column = [];
            for(var j = 0, jj = height; j < jj; j++){
                column.push(0);
            }
            matrix.push(column);
        }
    }

    function renderNewData(newData) {
        data = newData;
        initMatrix();
        renderMatrix();
        populate();
        width = findWidth();
        console.log(width);
        render();
    }

    function render() {
        var rootObj = document.querySelector(root);
        rootObj.style.position = "relative";

        var maped = {};
        for(var i = 0, ii = data.length; i < ii; i++){
            var item = data[i];
            maped[item.id + ""] = item;
        }

        var allItems = document.querySelectorAll(".jetro-item");
        for(var i = 0, ii = allItems.length; i < ii; i++){
            var domItem = allItems[i];
            var id = domItem.getAttribute("id").replace("jetro-", "");
            if (!maped[id]) {
                domItem.parentNode.removeChild(domItem);
            }
        }

        // find max size
        var maxWidth = height;
        //for(var i = 0, ii = data.length; i < ii; i++){
            //var item = data[i];
            //if (maxWidth < item.size[0]) {
                //maxWidth = item.size[0];
            //}
        //}

        //console.log("MAX", maxWidth);

        for(var i = 0, ii = data.length; i < ii; i++){

            var item = data[i];

            var itemDomObj = document.getElementById("jetro-" + item.id);

            var itemWidth = item.size[0] / width;
            var itemHeight = itemWidth;
            var marginBottom = (item.size[1] / item.size[0] * 100);

            if (!itemDomObj) {

                itemDomObj = document.createElement("div");

                itemDomObj.setAttribute("id", "jetro-" + item.id);
                itemDomObj.setAttribute("data-tags", item.tags.join(","));

                itemDomObj.style.transition = "all .3s ease-out";

                var innerDomObj = document.createElement("div");

                innerDomObj.style.marginBottom = marginBottom + "%";

                itemDomObj.setAttribute("class", "jetro-item " + item.style);
                itemDomObj.style.position = "absolute";

                itemDomObj.style.width = 100 * itemWidth + "%";
                itemDomObj.style.height = "auto";

                itemDomObj.appendChild(innerDomObj);
                rootObj.appendChild(itemDomObj);
 
            }

            var relWidth = maxWidth / item.size[0];
            var x = item.x / height * 100 * relWidth;
            var y = item.y  * 100 / item.size[1];

            var translate3d = "translate3d(" + x + "%," + y + "%,0)scale(1)";

            itemDomObj.style.WebkitTransform = translate3d;
            itemDomObj.style.transform = translate3d;

        }
    }

    function populate() {
        for(var i = 0, ii = data.length; i < ii; i++){
            var item = data[i];
            console.log("ADD " + item.size[0] + "x" + item.size[1]);
            var freeCoords = findNextFreeSpace(item);
            if (freeCoords) {
                item.x = freeCoords.x;
                item.y = freeCoords.y;
                for(var k = 0, kk = item.size[0]; k < kk; k++){
                    for(var l = 0, ll = item.size[1]; l < ll; l++){
                        matrix[freeCoords.x + k][freeCoords.y + l] = item;
                    }
                }
            }
            renderMatrix();
        }
    }

    function findNextFreeSpace(item) {
        for(var i = 0, ii = width; i < ii; i++){
            for(var j = 0, jj = height; j < jj; j++){
                if (matrix[i][j] == 0) {
                    var enoughSpace = true;
                    for(var k = 0, kk = item.size[0]; k < kk; k++){
                        for(var l = 0, ll = item.size[1]; l < ll; l++){
                            if (matrix[i + k][j + l] != 0) {
                                enoughSpace = false;
                                break;
                            }
                        }
                    }
                    if (i + item.size[0] > width || j + item.size[1] > height) {
                        enoughSpace = false;
                    }
                    if (enoughSpace) {
                        console.log("FOUND AT [%s,%s]", i, j);
                        return {
                            x: i,
                            y: j
                        }
                    }
                }
            }
        }
        return null;
    }

    function renderMatrix() {
        var columns = [];
        for(var j = 0, jj = height; j < jj; j++){
            var row = "";
            for(var i = 0, ii = width; i < ii; i++){
                row += matrix[i][j] ? "1" : "0";
            }
            console.log(row);
        }
        console.log("--");
    }

    function findWidth() {
        var columns = [];
        var maxWidth = 0;
        for(var j = 0, jj = height; j < jj; j++){
            var row = "";
            for(var i = 0, ii = width; i < ii; i++){
                row += matrix[i][j] ? "1" : "0";
            }
            var total = row.replace(/0+$/g, "");
            console.log("TOTAL", total);
            if (maxWidth < total.length) {
                maxWidth = total.length;
            }
        }
        return maxWidth;
    }


    return {
        init: init,
        render: renderNewData
    };

});
