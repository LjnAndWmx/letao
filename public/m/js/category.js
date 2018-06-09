$(function(){
    var app = new Myapp();
        app.initScroll(); 
        app.getLeftNavData(); 
        app.getRightNavData();      
})


var Myapp = function () {}
Myapp.prototype = {
  initScroll: function () {
    mui('.mui-scroll-wrapper').scroll({
      scrollY: true, //是否竖向滚动
      scrollX: false, //是否横向滚动
      startX: 0, //初始化时滚动至x
      startY: 0, //初始化时滚动至y
      indicators: true, //是否显示滚动条
      deceleration: 0.0006, //阻尼系数,系数越小滑动越灵敏
      bounce: true //是否启用回弹
    });
  },
  getLeftNavData:function(){
    $.ajax({
      url: '/category/queryTopCategory',
      success: function (back) {
          // console.log(back);
          var result = template('leftnav', back);
          $('.navleft').html(result);
      }
    })
  },
  getRightNavData:function(){
    getData(1);
    $('.nav-left ul').on('click', 'a', function (e) {
     var id = e.target.dataset['id'];
      console.log(id);
      $(e.target.parentNode).addClass('active').siblings().removeClass('active');
      getData(id);
  });
   function getData(id){
    $.ajax({
      url:'/category/querySecondCategory',
      data:{id:id},
      success:function(back){
        // console.log(back);
        var result = template('rightnav',back);
        if(result){
          $('.nav-right .mui-row').html(result);
        }else{
          $('.nav-right .mui-row').html('没有数据');
        }
      }
    })
   }
  }
}