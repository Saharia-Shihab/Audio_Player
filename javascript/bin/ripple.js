export default () => {
    /**
     * @param {Element} el
     * @param {string} className
     */
    function hasClass(el, className) {
        return (' ' + el.className + ' ').indexOf(' ' + className + ' ') > -1;
    }

    /**
     * @param {Element} el
     * @param {string} className
     */
    function addClass(el, className) {
        if (el.classList) el.classList.add(className);
        else if (!hasClass(el, className)) el.className += ' ' + className;
    }

    /**
     * @param {Element} el
     * @param {string} className
     */
    function removeClass(el, className) {
        if (el.classList) el.classList.remove(className);
        else if (hasClass(el, className)) {
            var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
            el.className = el.className.replace(reg, ' ');
        }
    }
    var RippleButton = document.querySelectorAll('.ripple_effect');
    const isTouchDevice = 'ontouchstart' in document.documentElement;
    for (let index = 0; index < RippleButton.length; index++) {
        if (RippleButton[index]) {
            const Exist_ = RippleButton[index].querySelector(`.ripple_container`);

            const rippleContainer = document.createElement('div');
            rippleContainer.classList.add('ripple_container');
            const rippleElement = document.createElement('div');
            rippleElement.classList.add('ripple_element');
            const rippleOverlay = document.createElement('div');
            rippleOverlay.classList.add('ripple_overlay');
            rippleOverlay.setAttribute('tabindex', "-1");

            rippleContainer.append(rippleElement);
            rippleContainer.append(rippleOverlay);
            if (!Exist_) RippleButton[index].append(rippleContainer);


            let CurrentColor;
            if (hasClass(RippleButton[index], "ripple_reality")) {
                CurrentColor = "#E5282A";
            } else if (hasClass(RippleButton[index], "ripple_time")) {
                CurrentColor = "#008A25";
            } else if (hasClass(RippleButton[index], "ripple_space")) {
                CurrentColor = "#246CFF";
            } else if (hasClass(RippleButton[index], "ripple_water")) {
                CurrentColor = "#40C4FF";
            } else if (hasClass(RippleButton[index], "ripple_power")) {
                CurrentColor = "#6A00FF";
            } else if (hasClass(RippleButton[index], "ripple_mind")) {
                CurrentColor = "#FFB218";
            } else if (hasClass(RippleButton[index], "ripple_soul")) {
                CurrentColor = "#FF8B00";
            } else if (hasClass(RippleButton[index], "ripple_tree")) {
                CurrentColor = "#1ABC9C";
            } else if (hasClass(RippleButton[index], "ripple_dark")) {
                CurrentColor = "#1E1F22";
            } else if (hasClass(RippleButton[index], "ripple_black")) {
                CurrentColor = "#000000";
            } else if (hasClass(RippleButton[index], "ripple_light")) {
                CurrentColor = "#F2FAFB";
            } else if (hasClass(RippleButton[index], "ripple_white")) {
                CurrentColor = "#FFFFFF";
            } else if (hasClass(RippleButton[index], "ripple_primary")) {
                CurrentColor = "#3C4043";
            } else if (hasClass(RippleButton[index], "ripple_secondary")) {
                CurrentColor = "#5F6368";
            } else if (hasClass(RippleButton[index], "ripple_tertiary")) {
                CurrentColor = "#80868B";
            } else if (hasClass(RippleButton[index], "ripple_quaternary")) {
                CurrentColor = "#9aa0a6";
            } else if (hasClass(RippleButton[index], "ripple_simple")) {
                CurrentColor = "#DADCE0";
            } else {
                CurrentColor = "currentColor";
            }
            // @ts-ignore
            RippleButton[index].querySelector('.ripple_container').style.color = CurrentColor;
        }
        const RippleFunction = function (event) {
            const rippleElementInit = this.querySelector('.ripple_container').querySelector('.ripple_element');
            const Rect = this.getBoundingClientRect();
            let __Size;
            let __Top;
            let __Left;
            let __Time;
            let __opacity;
            let __easing;
            if (hasClass(this, "ripple_center")) {
                __Size = (Rect.width > Rect.height ? Rect.width : Rect.height) * 1.3;
            } else {
                __Size = (Rect.width > Rect.height ? Rect.width : Rect.height) * 2.2;
            }
            if (hasClass(this, "ripple_center")) {
                __Left = (Rect.width / 2) - (__Size / 2);
                __Top = (Rect.height / 2) - (__Size / 2);
            } else {
                if (event.type == 'touchstart') {
                    for (let index = 0; index < event.touches.length; index++) {
                        let __Touch = event.touches[index];
                        __Left = __Touch.clientX - Rect.left - __Size / 2;
                        __Top = __Touch.clientY - Rect.top - __Size / 2;
                    }
                } else if (event.type == 'mousedown') {
                    __Left = event.clientX - Rect.left - __Size / 2;
                    __Top = event.clientY - Rect.top - __Size / 2;
                }
            }
            rippleElementInit.style.width = rippleElementInit.style.height =
                __Size + 'px';
            rippleElementInit.style.left = __Left + 'px';
            rippleElementInit.style.top = __Top + 'px';
            rippleElementInit.setAttribute('__Pressed', '');
            if (hasClass(this, "ripple_center")) {
                __Time = 450
            } else {
                __Time = 300
            }
            const scaleAnimation = rippleElementInit.animate(
                [{
                    transform: 'scale(0)'
                },
                {
                    transform: 'scale(1)'
                }
                ], {
                duration: __Time,
                easing: 'cubic-bezier(0, 0, 0.2, 1)',
                fill: 'forwards'
            }
            );
            if (hasClass(this, "ripple_gradient")) {
                __opacity = "0.25";
                __easing = "linear";
            } else {
                __opacity = "0.12";
                __easing = "ease";
            }
            const opacityAnimation = rippleElementInit.animate(
                [{
                    opacity: '0'
                },
                {
                    opacity: __opacity
                }
                ], {
                duration: 75,
                easing: __easing,
                fill: 'forwards'
            }
            );
            scaleAnimation.addEventListener('finish', () => {
                scaleAnimation.cancel();
                opacityAnimation.cancel();
                if (!rippleElementInit.hasAttribute("__Pressed")) {
                    rippleElementInit.setAttribute('__Pressed', '');
                    setTimeout(() => {
                        rippleElementInit.removeAttribute('__Pressed', '');
                    }, 0);
                }
            });
        };
        if (isTouchDevice) {
            RippleButton[index].addEventListener('touchstart', RippleFunction);
        } else {
            RippleButton[index].addEventListener('mousedown', RippleFunction);
        }
        ['mouseup', 'mouseleave', 'touchend', 'touchmove'].forEach(function (event) {
            RippleButton[index].addEventListener(event, function () {
                const rippleElementInit = this.querySelector('.ripple_container').querySelector('.ripple_element');
                rippleElementInit.removeAttribute('__Pressed', '');
            });
        });
        if (hasClass(RippleButton[index], "doHover") || hasClass(RippleButton[index], "doFocus")) {
            ['mouseenter', 'touchstart'].forEach(function (event) {
                RippleButton[index].addEventListener(event, function () {
                    const rippleOverlay = this.querySelector('.ripple_container').querySelector('.ripple_overlay');
                    rippleOverlay.setAttribute('hover', '');
                });
            });
            ['mouseleave', 'touchend'].forEach(function (event) {
                RippleButton[index].addEventListener(event, function () {
                    const rippleOverlay = this.querySelector('.ripple_container').querySelector('.ripple_overlay');
                    rippleOverlay.removeAttribute('hover');
                });
            });
        }
        if (hasClass(RippleButton[index], "doFocus")) {
            RippleButton[index].addEventListener("focus", function () {
                const rippleOverlay = this.querySelector('.ripple_container').querySelector('.ripple_overlay');
                rippleOverlay.setAttribute('focus', '');
            });
            RippleButton[index].addEventListener("blur", function () {
                const rippleOverlay = this.querySelector('.ripple_container').querySelector('.ripple_overlay');
                rippleOverlay.removeAttribute('focus', '');
            });
        }
    }
    var stylesheetElement = document.createElement('style');
    document.head.append(stylesheetElement);
    var styleSheet = stylesheetElement.sheet;
    styleSheet.insertRule(
        `.ripple_effect {
        position: relative;
    }`, styleSheet.cssRules.length
    );
    styleSheet.insertRule(
        `.ripple_effect > .ripple_container {
        color: inherit;
        display: block;
        height: 100%;
        left: 0;
        position: absolute;
        top: 0;
        width: 100%;
        z-index: 0;
        overflow: hidden;
        border-radius: inherit;
        -webkit-border-radius: inherit;
        -moz-border-radius: inherit;
        -ms-border-radius: inherit;
        -o-border-radius: inherit;
    }`, styleSheet.cssRules.length
    );

    styleSheet.insertRule(
        `.ripple_effect > .ripple_container > .ripple_element {
        color: inherit;
        opacity: 0;
        pointer-events: none;
        position: absolute;
        overflow: hidden;
        background-color: currentColor;
        border-radius: 50%;
        -webkit-border-radius: 50%;
        -moz-border-radius: 50%;
        -ms-border-radius: 50%;
        -o-border-radius: 50%;
        transition: opacity 0.3s ease;
        -webkit-transition: opacity 0.3s ease;
        -moz-transition: opacity 0.3s ease;
        -ms-transition: opacity 0.3s ease;
        -o-transition: opacity 0.3s ease;
    }`, styleSheet.cssRules.length
    );

    styleSheet.insertRule(
        `.ripple_effect > .ripple_container > .ripple_element[__Pressed]{
        opacity: 0.12;
    }`, styleSheet.cssRules.length
    );

    styleSheet.insertRule(
        `.ripple_effect > .ripple_container > .ripple_overlay{
        color: inherit;
        background-color: currentColor;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        position: absolute;
        pointer-events: none;
        border-radius: inherit;
        -webkit-border-radius: inherit;
        -moz-border-radius: inherit;
        -ms-border-radius: inherit;
        -o-border-radius: inherit;
        opacity: 0;
        transition: opacity 225ms cubic-bezier(0.35, 0, 0.25, 1);
    }`, styleSheet.cssRules.length
    );

    styleSheet.insertRule(
        `.ripple_effect > .ripple_container > .ripple_overlay[hover]{
        opacity: 0.04;
    }`, styleSheet.cssRules.length
    );
    styleSheet.insertRule(
        `.ripple_effect > .ripple_container > .ripple_overlay[focus]{
        opacity: 0.12;
    }`, styleSheet.cssRules.length
    );

    styleSheet.insertRule(
        `.ripple_effect.ripple_gradient > .ripple_container > .ripple_element{
        background-size: cover;
        background-image: radial-gradient(circle farthest-side,currentColor,currentColor 80%, transparent 100%);
        background-color: transparent;
    }`, styleSheet.cssRules.length
    );

    styleSheet.insertRule(
        `.ripple_effect.ripple_gradient > .ripple_container > .ripple_element[__Pressed] {
        opacity: 0.25;
    }`, styleSheet.cssRules.length
    );

};