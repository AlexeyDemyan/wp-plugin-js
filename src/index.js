import './index.scss';
import {
  TextControl,
  Flex,
  FlexBlock,
  FlexItem,
  Button,
  Icon,
} from '@wordpress/components';

// It's a good idea to make customStartFunction immediately invoked, so we don't mess with the name
// (() => {console.log('immediately invoking')})();

// That thing absolutely obliterates my CallStack. That subscription fires like 300 times per second, Jeezuz
// function customStartFunction() {
//   let isLocked = false;

//   // Cool way to subscribe to like a WP event. This will be called every time data on the block editor changes
//   wp.data.subscribe(() => {
//     // wp api to get all blocks on the block editor
//     // filteting by block data related to our plugin, and where a correct answer has not been specified yet
//     const results = wp.data
//       .select('core/block-editor')
//       .getBlocks()
//       .filter((block) => {
//         return (
//           block.name == 'alex-attention-plugin/are-you-paying-attention' &&
//           block.attributes.correctAnswer == undefined
//         );
//       });

//     if (results.length && !isLocked) {
//       isLocked = true;
//       // for lockPostSaving we come up with a name of the criteria
//       wp.data.dispatch('core/editor').lockPostSaving('noanswer');
//     }

//     // Aaan unlocking here:
//     if (results.length && isLocked) {
//       isLocked = false;
//       wp.data.dispatch('core/editor').unlockPostSaving('noanswer');
//     }
//   });
// }
// customStartFunction();

// we added the wp namespace as a dependency in wp_enqueue_script in index.php
wp.blocks.registerBlockType('alex-attention-plugin/are-you-paying-attention', {
  title: 'Are You Paying Attention?',
  icon: 'smiley',
  category: 'common',
  attributes: {
    // type property is the required one
    question: { type: 'string' },
    answers: { type: 'array', default: [''] },
    // it's better to set default to undefines, as ZERO value will evaluate as False
    correctAnswer: { type: 'number', default: undefined },
  },
  // Edit function controls what shows in Admin Post Editor screen
  edit: EditComponent,
  // Save function controls what actual plebs will see in the content
  // php will be determining value on the fly:
  save: (props) => {
    return null;
  },
});

function EditComponent(props) {
  // TextControl component conveniently passes the new value to the onChange callback
  // So we don't need to drill into target.value:
  function updateQuestion(value) {
    props.setAttributes({ question: value });
  }

  function deleteAnswer(indexToDelete) {
    const newAnswers = props.attributes.answers.filter((item, index) => {
      return index != indexToDelete;
    });
    props.setAttributes({ answers: newAnswers });

    if (indexToDelete == props.attributes.correctAnswer) {
      props.setAttributes({ correctAnswer: undefined });
    }
  }

  function markAsCorrect(index) {
    props.setAttributes({ correctAnswer: index });
  }

  return (
    <div className='paying-attention-edit-block'>
      <TextControl
        label='Question:'
        style={{ fontSize: '20px' }}
        value={props.attributes.question}
        onChange={updateQuestion}
      />
      <p style={{ fontSize: '13px', margin: '20px 0 8px 0' }}>Answers: </p>
      {props.attributes.answers.map((answer, index) => {
        return (
          <Flex>
            <FlexBlock>
              <TextControl
                value={answer}
                onChange={(newVal) => {
                  // Doing proper React update here
                  const newAnswers = props.attributes.answers.concat([]);
                  newAnswers[index] = newVal;
                  props.setAttributes({ answers: newAnswers });
                }}
                autoFocus={answer == undefined}
              />
            </FlexBlock>
            <FlexItem>
              <Button
                onClick={() => {
                  markAsCorrect(index);
                }}
              >
                <Icon
                  icon={
                    props.attributes.correctAnswer == index
                      ? 'star-filled'
                      : 'star-empty'
                  }
                  className='mark-as-correct'
                />
              </Button>
            </FlexItem>
            <FlexItem>
              <Button
                className='attention-delete'
                isLink
                onClick={() => deleteAnswer(index)}
              >
                Delete
              </Button>
            </FlexItem>
          </Flex>
        );
      })}
      <Button
        isPrimary
        onClick={() => {
          props.setAttributes({
            answers: props.attributes.answers.concat([undefined]),
          });
        }}
      >
        Add Another Answer
      </Button>
    </div>
  );
}
