const plusImage =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC' +
  '9zdmciIHZlcnNpb249IjEuMSIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0Ij48cGF0aCBkPSJNMT' +
  'ggMTBoLTR2LTRjMC0xLjEwNC0uODk2LTItMi0ycy0yIC44OTYtMiAybC4wNzEgNGgtNC4wNz' +
  'FjLTEuMTA0IDAtMiAuODk2LTIgMnMuODk2IDIgMiAybDQuMDcxLS4wNzEtLjA3MSA0LjA3MW' +
  'MwIDEuMTA0Ljg5NiAyIDIgMnMyLS44OTYgMi0ydi00LjA3MWw0IC4wNzFjMS4xMDQgMCAyLS' +
  '44OTYgMi0ycy0uODk2LTItMi0yeiIgZmlsbD0id2hpdGUiIC8+PC9zdmc+Cg==';

const minusImage =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAw' +
  'MC9zdmciIHZlcnNpb249IjEuMSIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0Ij48cGF0aCBkPS' +
  'JNMTggMTFoLTEyYy0xLjEwNCAwLTIgLjg5Ni0yIDJzLjg5NiAyIDIgMmgxMmMxLjEwNCAw' +
  'IDItLjg5NiAyLTJzLS44OTYtMi0yLTJ6IiBmaWxsPSJ3aGl0ZSIgLz48L3N2Zz4K';

function createPlusField() {
  return new Blockly.FieldImage(plusImage, 15, 15, undefined, plusClick);
}

function createMinusField() {
  return new Blockly.FieldImage(minusImage, 15, 15, undefined, minusClick);
}

function plusClick(plusField) {
  const block = plusField.getSourceBlock();

  if (block.isInFlyout) {
    return;
  }

  Blockly.Events.setGroup(true);
  const oldExtraState = JSON.stringify(block.saveExtraState());
  block.plus(plusField.args_);
  const newExtraState = JSON.stringify(block.saveExtraState());

  if (oldExtraState != newExtraState) {
    Blockly.Events.fire(
      new Blockly.Events.BlockChange(
        block, 'mutation', null, oldExtraState, newExtraState
      )
    );
  }
  Blockly.Events.setGroup(false);
}

function minusClick(minusField) {
  const block = minusField.getSourceBlock();

  if (block.isInFlyout) {
    return;
  }

  Blockly.Events.setGroup(true);
  const oldExtraState = JSON.stringify(block.saveExtraState());
  block.minus(minusField.args_);
  const newExtraState = JSON.stringify(block.saveExtraState());

  if (oldExtraState != newExtraState) {
    Blockly.Events.fire(
      new Blockly.Events.BlockChange(
        block, 'mutation', null, oldExtraState, newExtraState
      )
    );
  }
  Blockly.Events.setGroup(false);
}

Blockly.defineBlocksWithJsonArray([
  {
    "type": "dict_key_value",
    "message0": "%1 [ %2 ]",
    "args0": [
      {
        "type": "field_variable",
        "name": "variable",
        "variable": "item"
      },
      {
        "type": "input_value",
        "name": "key0"
      }
    ],
    "output": null,
    "inputsInline": true,
    "colour": 260,
    "tooltip": i18n.get('#blk-dict_key_value_tooltip#'),
    "helpUrl": "",
    "mutator": "dict_create_with_mutator",
  },
]);

Blockly.defineBlocksWithJsonArray([
  {
    "type": "dict_key_value_input",
    "message0": "%1 [ %2 ]",
    "args0": [
      {
        "type": "input_value",
        "name": "variable"
      },
      {
        "type": "input_value",
        "name": "key0"
      }
    ],
    "output": null,
    "inputsInline": true,
    "colour": 260,
    "tooltip": i18n.get('#blk-dict_key_value_tooltip#'),
    "helpUrl": "",
    "mutator": "dict_create_with_mutator",
  },
]);

const dictCreateMutator = {
  itemCount_: 1,

  mutationToDom: function() {
    const container = Blockly.utils.xml.createElement('mutation');
    container.setAttribute('items', this.itemCount_);
    return container;
  },

  domToMutation: function(xmlElement) {
    const targetCount = parseInt(xmlElement.getAttribute('items'), 10);
    this.updateShape_(targetCount);
  },

  saveExtraState: function() {
    return {
      'itemCount': this.itemCount_,
    };
  },

  loadExtraState: function(state) {
    this.updateShape_(state['itemCount']);
  },

  updateShape_: function(targetCount) {
    while (this.itemCount_ < targetCount) {
      this.addPart_();
    }
    while (this.itemCount_ > targetCount) {
      this.removePart_();
    }
  },

  plus: function() {
    this.addPart_();
  },

  minus: function() {
    if (this.itemCount_ == 1) {
      return;
    }
    this.removePart_();
  },

  addPart_: function() {
    this.removeInput('END');

    const key = this.appendValueInput('key' + this.itemCount_)
      .appendField('[');
    this.appendDummyInput('CLOSE' + this.itemCount_)
      .appendField(']')

    key.connection.setShadowDom(Blockly.Xml.textToDom('<shadow type="text"></shadow>'));

    this.appendDummyInput('END')
      .appendField(createMinusField(), 'PLUS')
      .appendField(createPlusField(), 'PLUS');
    this.itemCount_++;
  },

  removePart_: function() {
    this.itemCount_--;
    this.removeInput('END');
    this.removeInput('CLOSE' + this.itemCount_);
    this.removeInput('key' + this.itemCount_);
    if (this.itemCount_ == 1) {
      this.appendDummyInput('END')
        .appendField(createPlusField(), 'PLUS');
    } else {
      this.appendDummyInput('END')
      .appendField(createMinusField(), 'PLUS')
      .appendField(createPlusField(), 'PLUS');
    }
  },
};

const dictCreateHelper = function() {
  this.appendDummyInput('END')
    .appendField(createPlusField(), 'PLUS');
  this.updateShape_(1);
};

Blockly.Extensions.registerMutator('dict_create_with_mutator', dictCreateMutator, dictCreateHelper);