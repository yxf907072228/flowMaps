'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var $el = void 0,
    $paper = void 0,
    $tapu = void 0,
    $options = {};
function contextMenuHandler(e) {
    var _$options = $options,
        menuTypes = _$options.menuTypes,
        groupTypes = _$options.groupTypes,
        nodeTypes = _$options.nodeTypes,
        arrowTypes = _$options.arrowTypes,
        tapu = _$options.tapu;

    var target = $tapu.status.hoverGroup && $tapu.data($tapu.status.hoverGroup)['type'] || "rootGroup";
    console.log(target);
    $el.innerHTML = '\n        ' + menuTypes.map(function (item, i) {

        if (item.targets && (item.targets[target] == null || item.targets[target] == false)) {
            return;
        }

        if (item.key == 'addGroup') {
            return '<li class="first">\n                        \u65B0\u5EFA\u7EC4\n                        <ul class="rightMenu rightMenuChild">\n                        ' + Object.keys(groupTypes).map(function (key) {
                var node = groupTypes[key];
                return '<li class="item" name="' + item.key + '-' + key + '">' + node['title'] + '</li>';
            }).join('') + '\n                        </ul>\n                    </li>';
        } else if (item.key == 'addNode') {
            return '<li  class="first">\n                    \u65B0\u5EFA\u8282\u70B9\n                    <ul  class="rightMenu rightMenuChild">\n                        ' + Object.keys(nodeTypes).map(function (key) {
                var node = nodeTypes[key];
                return '<li class="item" name="' + item.key + '-' + key + '">' + node['title'] + '</li>';
            }).join('') + '\n                    </ul>\n                </li>';
        } else if (item.key == 'addArrow') {
            //arrowTypes
            return '<li  class="first">\n                \u8FDE\u7EBF\n                <ul  class="rightMenu rightMenuChild">\n                    ' + arrowTypes.map(function (node) {

                return '<li class="item" name="' + item.key + '-' + node.key + '">' + node['title'] + '</li>';
            }).join('') + '\n                </ul>\n                </li>';
        } else {
            return '<li  class="first item" name="' + item.key + '">' + item.title + '</li>';
        }
    }).join('') + '\n\n    ';
    if ($el) {
        Object.assign($el.style, {
            top: e.clientY + 'px',
            left: e.clientX + 'px',
            visibility: 'visible'
        });
    }
    e.preventDefault();
}

function hideMenu() {
    if ($el) {
        clearActiveMenu();
        Object.assign($el.style, {
            visibility: 'hidden'
        });
    }
}

function destroy() {
    if ($paper) {
        $paper.removeEventListener('contextmenu', contextMenuHandler);
        $paper.addEventListener('click', hideMenu);
    }
}

function clearActiveMenu() {
    if ($el) {
        Array.from($el.querySelectorAll('li.first')).map(function (item) {
            item.className = item.className.replace(' active', '');
        });
    }
}

function render(el, options) {
    var menuTypes = options.menuTypes,
        groupTypes = options.groupTypes,
        nodeTypes = options.nodeTypes,
        tapu = options.tapu;

    $el = el;
    $tapu = tapu;
    $paper = tapu.paper;
    $options = options;
    function clickHandler() {
        alert();
    }
    $paper.addEventListener('contextmenu', contextMenuHandler);

    el.addEventListener('mouseover', function (e) {
        var target = e.target;
        if (target.className.indexOf('first') != -1) {
            clearActiveMenu();
            target.className = target.className + ' active';
        } else {
            // clearActiveMenu();
        }
    });

    el.addEventListener('click', function (e) {
        var target = e.target;
        if (target.className.indexOf('item') != -1) {
            //rightMenuClickHandle
            var name = target.getAttribute('name');
            if (name.indexOf('-') != -1) {
                $tapu.rightMenuClickHandle(name.split('-')[0], {
                    type: name.split('-')[1],
                    left: $el.offsetLeft,
                    top: $el.offsetTop
                }, e);
            } else {
                $tapu.rightMenuClickHandle(name, e);
            }

            hideMenu();
        }
    });

    $paper.addEventListener('click', hideMenu);
}

exports.default = {
    render: render
};