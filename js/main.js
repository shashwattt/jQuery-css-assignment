$(document).ready(function () {

    var srckey = window.location.href.split('?')[1];
    if(srckey){
        srckey = srckey.split('=')[1];
        console.log("param", srckey);
    }
    $.ajax({
        url: 'https://priyankabarde.github.io/category_data.json',
        success: function (response) {
            var menuRow = $('#menu-row');
            if(response && response.length>0 && menuRow){
                response.forEach(element => {
                    console.log(element);
                    let key = element['0'].seo_identifier
                    if(srckey && key === srckey){
                        showPopupView(element);
                    }
                    
                    let div = $("<div>").addClass("column-menu");
                    let h6 = $("<h6>").html(element['0'].name.toUpperCase());
                    let ul = $("<ul>");
                    let a = $("<a>").attr({
                        "href":window.location.href+"?key="+key,
                        "target":"_blank",
                        "style":"text-decoration: none"
                    }).append(h6);
                    if(element && element.subCategories && element.subCategories.length>0){
                        element.subCategories.forEach(item =>{
                            let li = $('<li>').html(item.name);
                            // li.bindclick(showPopupView(element));
                            item.logo = element['0'].image_url;
                            li.on("click",function(){
                                showPopupView(item, 'SUB ');
                            });
                            ul.append(li);
                        })
                    }
                    div.append(a).append(ul);
                    menuRow.append(div);

                });
            }
        },
        error: function (response) {
            console.log('Failed');
            console.log(response);
        }
    });

    function showPopupView(data, subcat){
        let text = '';
        let logo = $('#cat-logo');
        let header = $('#cat-header');
        let type = $('#cat-type');
        let catText = 'CATEGORY';
        if(subcat){
            logo.attr({"src":data.logo});
            header.html(data.name.toUpperCase());
            text = 'There are ' + data.offer_count+' offers available for '+data.name;
            type.html('SUB ' + catText)
        }else{
            logo.attr({"src":data['0'].image_url});
            header.html(data['0'].name.toUpperCase());
            text = 'There are ' + data.subCategories.length+' sub-categories and '+data['0'].offer_count+' offers available for '+data['0'].name;
            type.html(catText)
        }
        $('#cat-desc').html(text)
        $('.popup').fadeIn(250);
    }
   
    $('#closePopup').click(()=>{
        $('.popup').fadeOut(250);
    });

    $('.view-all-offers').click(()=>{
        $('.popup').fadeOut(250);
    });
});