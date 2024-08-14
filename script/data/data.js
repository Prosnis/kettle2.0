import * as controller from '../controlForm/controlForm.controller.js'

const statuses = {
  boiling: "boiling...",
  waiting: "waiting...",
  done: "done",
  burn: 'the kettle burned down🤡'
};

const events = {
  btnFill: {
    action: 'click',
    func: controller.fill
  },
  btnStart: {
    action: 'click',
    func: controller.start
  },
  btnStop: {
    action: 'click',
    func: controller.stop
  },
};

export { statuses, events };
