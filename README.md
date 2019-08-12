### 分页插件
```javascript
new Pager({
    container: document.querySelector(".pagenation"),
    firstPageText: '首页',
    lastPageText: '尾页',
    prevPageText: '上一页',
    nextPageText: '下一页',
    limit: 10, // 每一页展示的数据条数
    panelNumber: 5, // 分页面板中展示的页码数量
    current: 1, // 当前页码
    total: 10, // 总数据条数
    onChange: null //回调函数
})
```