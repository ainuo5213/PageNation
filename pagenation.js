/**
 * Created by 16609 on 2019/8/12
 *
 */
(function () {
    function Pager(options) {
        let defaultOptions = {
            container: document.querySelector(".pagenation"),
            firstPageText: '首页',
            prevPageText: '上一页',
            lastPageText: '尾页',
            nextPageText: '下一页',
            limit: 10, // 每一页展示的数据条数
            panelNumber: 5, // 分页面板中展示的页码数量
            current: 1,
            total: 10, // 总数据条数
            onChange: null
        };
        this.options = Object.assign({}, defaultOptions, options);
        this.show(); // 初次显示
        this.registerEvent(); //绑定事件
    }

    Pager.prototype.registerEvent = function () {
        this.options.container.addEventListener('click', (e) => {
            let target = e.target;
            if (target.classList.contains('first') && !target.classList.contains('disabled')) {
                this.gotoPage(1)
            } else if (target.classList.contains('prev') && !target.classList.contains('disabled')) {
                this.gotoPage(this.options.current - 1)
            } else if (target.classList.contains('next') && !target.classList.contains('disabled')) {
                this.gotoPage(this.options.current + 1)
            } else if (target.classList.contains('last') && !target.classList.contains('disabled')) {
                this.gotoPage(this.getTotalPage())
            } else if (target.classList.contains('number') && !target.classList.contains('active') && target.dataset.index) {
                this.gotoPage(+target.dataset.index)
            }
        })
    };

    Pager.prototype.gotoPage = function (page) {
        if (page < 1) {
            page = 1
        }
        let totalPage = this.getTotalPage();
        if (page > totalPage) {
            page = totalPage
        }
        if (page === this.options.current) {
            return;
        }
        this.options.current = page;
        this.show();
        if (this.options.onChange) {
            this.options.onChange()
        }
    };

    // 每次切换重新显示
    Pager.prototype.show = function () {
        const {firstPageText, prevPageText, container, nextPageText, lastPageText} = this.options;
        container.innerHTML = '';
        let fragment = document.createDocumentFragment();
        let firstCls = '';
        if (this.options.current === 1) {
            firstCls += ' disabled'
        }
        let firstPage = this.createPageItem('first' + firstCls, firstPageText);
        let prevPage = this.createPageItem('prev' + firstCls, prevPageText);
        let lastCls = '';
        if (this.options.current === this.getTotalPage()) {
            lastCls += ' disabled'
        }
        let nextPage = this.createPageItem('next' + lastCls, nextPageText);
        let lastPage = this.createPageItem('last' + lastCls, lastPageText);
        let numberPages = this.createNumberPage();
        let spanPage = this.createSpanPage();
        fragment.append(firstPage);
        fragment.append(prevPage);
        fragment.append(numberPages);
        fragment.append(nextPage);
        fragment.append(lastPage);
        fragment.append(spanPage);
        this.options.container.append(fragment);
    };

    Pager.prototype.createSpanPage = function () {
        let a = document.createElement('a');
        a.className = 'pager-item';
        a.innerText = `${this.options.current}/ ${this.getTotalPage()}`;
        return a;
    };

    Pager.prototype.createNumberPage = function () {
        // 显示最小数字，根据显示的panel来计算
        // current在一定时候应处于最中间
        let {current, panelNumber} = this.options;
        let minNumber = current - Math.floor(panelNumber / 2);
        if (minNumber <= 1) {
            minNumber = 1
        }
        // 显示的最大数字
        let maxNumber = minNumber + panelNumber - 1;
        let totalPage = this.getTotalPage();
        if (maxNumber > totalPage) {
            maxNumber = totalPage
        }
        let fragment = document.createDocumentFragment();
        for (let i = minNumber; i < maxNumber + 1; i++) {
            let cls = 'number';
            if (i === current) {
                cls += ' active'
            }
            fragment.append(this.createPageItem(cls, i, 'number'))
        }
        return fragment
    };

    Pager.prototype.getTotalPage = function () {
        return Math.ceil(this.options.total / this.options.limit);
    };

    Pager.prototype.createPageItem = function (className, innerText, number) {
        let a = document.createElement('a');
        a.className = 'pager-item ' + className;
        a.innerText = innerText;
        if (number) {
            a.dataset.index = innerText;
        }
        return a
    };

    window.Pager = Pager;

})();