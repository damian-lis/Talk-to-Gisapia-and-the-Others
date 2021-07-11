import { toggleValue, types } from '/data//names.js';

export default ({ toggle, objs, delay }) => {
  if (!objs) return;

  const helperLogic = () => {
    objs.map((obj) => {
      if (!obj.elements) return;

      obj.elements.map((el) => {
        let element = el;

        if (typeof el === types.string) {
          element = document.querySelector(el);
        }

        obj.listeners &&
          obj.listeners.map((listener) => {
            const { event, cb } = listener;
            element.addEventListener(event, (e) => cb(e));
          });

        obj.styleProps &&
          obj.styleProps.map((prop) => {
            if (toggle) {
              switch (toggle) {
                case toggleValue.on:
                  element.style[prop.name] = prop.values.on;
                  break;
                case toggleValue.off:
                  element.style[prop.name] = prop.values.off;
                  break;

                default:
                  break;
              }
            } else element.style[prop.name] = prop.value;
          });

        obj.props &&
          obj.props.map((prop) => {
            if (toggle) {
              switch (toggle) {
                case toggleValue.on:
                  element[prop.name] = prop.values.on;
                  break;
                case toggleValue.off:
                  element[prop.name] = prop.values.off;
                  break;

                default:
                  break;
              }
            } else element[prop.name] = prop.value;
          });
      });
    });
  };

  if (delay) return setTimeout(helperLogic, delay);
  helperLogic();
};
