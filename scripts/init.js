require(['lib/jetro'], function(jetro) {

    function filterData(tag) {
        var newData = [];
        for(var i = 0, ii = data.length; i < ii; i++){
            if (data[i].tags.indexOf(tag) == -1) {
                newData.push(data[i]);
            }
        }
        data = newData;
        return data;
    }

    var data = [{
        id: 1,
        size: [2,2],
        style: "color-1",
        tags: ["lorem"]
    },{
        id: 2,
        size: [1,1],
        style: "color-2",
        tags: ["dolores"]
    },{
        id: 3,
        size: [1,1],
        style: "color-3",
        tags: ["ipsum"]
    },{
        id: 4,
        size: [3,2],
        style: "color-4",
        tags: ["est"]
    },{
        id: 50,
        size: [2,1],
        style: "color-2",
        tags: ["dolores"]
    },{
        id: 5,
        size: [1,1],
        style: "color-1",
        tags: ["lorem"]
    },{
        id: 6,
        size: [1,1],
        style: "color-3",
        tags: ["ipsum"]
    },{
        id: 70,
        size: [3,3],
        style: "color-2",
        tags: ["dolores"]
    },{
        id: 7,
        size: [1,1],
        style: "color-2",
        tags: ["dolores"]
    },{
        id: 8,
        size: [2,3],
        style: "color-3",
        tags: ["ipsum"]
    }];

    jetro.init({
        root: "#grid",
        data: data,
        grid: [13,3],
        gutter: 5
    });

    var allItems = document.querySelectorAll(".jetro-item");
    for(var i = 0, ii = allItems.length; i < ii; i++){
        allItems[i].addEventListener("click", remove, true);
        allItems[i].addEventListener("touchstart", remove, true);
    }

    function remove(e) {
        var tags = this.getAttribute("data-tags");
        data = filterData(tags);
        jetro.render(data);
        e.preventDefault();
        return false;
    }

});
