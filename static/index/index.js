$(function () {

    /**
     * 获得所有文章
     */
    function getArticles() {
        $.ajax({
            type: "GET",
            url: "/api/getArticle",
            success: function (result, status, xhr) {
                console.log('getArticles success', result);
            },
            error: function (xhr, status, error) {
                console.error(error);
            }
        })
    }

});