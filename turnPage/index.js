(function () {
  //存储翻页信息的构造函数
  function Page(options, wrap) {
    this.total = options.total || 1;
    this.current = options.current || 1;
    this.size = options.size || 10;
    this.change = options.change || function (){}
    this.wrap = wrap;
  }
  Page.prototype.init = function () {
    //创建翻页的结构
    this.createDom();
    //实现切换功能
    this.changePage();
  };

  Page.prototype.createDom = function () {
    const pageWrapper = $('<div class="my-page"></div>');
    //上一页
    if (this.current > 1) {
      $('<div class="my-page-prev-btn">上一页</div>').appendTo(pageWrapper);
    }
    $('<div class="my-page-num">1</div>')
      .appendTo(pageWrapper)
      .addClass(this.current === 1 ? "my-page-current" : "");
    if (this.current - 2 - 1 > 1) {
      $("<span>...</span>").appendTo(pageWrapper);
    }
  Page.prototype.changePage = function(){
      const self=this;
      $(this.wrap).find('.my-page').on('click','.my-page-prev-btn',function(){
         self.current -- ;
         self.init();
         self.change(self.current);
      }).on('click', '.my-page-next-btn',function(){
         self.current ++;
         self.init();
         self.change(self.current);
      }).on('click', '.my-page-num',function(){
         self.current = parseInt($(this).text());
         self.init();
         self.change(self.current);
      })
  }

    //中间五页
    for (let i = this.current - 2; i <= this.current + 2; i++) {
      if (i > 1 && i < this.total) {
        $('<div class="my-page-num"></div>')
          .text(i)
          .appendTo(pageWrapper)
          .addClass(this.current === i ? "my-page-current" : "");
      }
    }
    if (this.current + 2 + 1 < this.total) {
      $("<span>...</span>").appendTo(pageWrapper);
    }

    //最后一页
    this.total > 1 &&
      $('<div class="my-page-num"></div>')
        .text(this.total)
        .appendTo(pageWrapper)
        .addClass(this.current === this.total ? "my-page-current" : "");

    //下一页
    if (this.current < this.total) {
      $('<div class="my-page-next-btn">下一页</div>').appendTo(pageWrapper);
    }
    $(this.wrap).empty().append(pageWrapper);
  };

  $.fn.extend({
    page: function (options) {
      const obj = new Page(options, this);
      obj.init();
    },
  });
})();
