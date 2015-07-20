$.fn.timeline = function () {
    //timeline entry circles
    $(".timeline-wrapper .circle-list").each(function () {
        $(this).prepend("<span class='circle'></span>");
    });

    // pulls date badges to right on even time entries
    $(".timeline-wrapper .row:nth-child(even)").each(function () {
        $(this).find(".badge").parent().css("text-align", "right");
    });

    // image overlay
    $(".time-entry img").each(function () {
        var image = $(this);
        var content = image.siblings(".hovercontent");

        var imgWidth = image.width();
        var imgHeight = image.height();
        var contentParent = content.parent();
        content.width(imgWidth - 40).height(imgHeight - 40);
        contentParent.css({
            "position": "relative",
        });
        var padding = contentParent.css("padding-top");

    });
}