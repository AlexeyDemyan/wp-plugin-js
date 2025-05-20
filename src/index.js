import './index.scss';
import {
  TextControl,
  Flex,
  FlexBlock,
  FlexItem,
  Button,
  Icon,
} from '@wordpress/components';

// we added the wp namespace as a dependency in wp_enqueue_script in index.php
wp.blocks.registerBlockType('alex-attention-plugin/are-you-paying-attention', {
  title: 'Are You Paying Attention?',
  icon: 'smiley',
  category: 'common',
  attributes: {
    // type property is the required one
    skyColor: { type: 'string' },
    grassColor: { type: 'string' },
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
  function updateSkyColor(e) {
    props.setAttributes({ skyColor: e.target.value });
  }

  function updateGrassColor(e) {
    props.setAttributes({ grassColor: e.target.value });
  }

  return (
    <div className='paying-attention-edit-block'>
      <TextControl label='Question:' style={{ fontSize: '20px' }} />
      <p style={{ fontSize: '13px', margin: '20px 0 8px 0' }}>Answers: </p>
      <Flex>
        <FlexBlock>
          <TextControl></TextControl>
        </FlexBlock>
        <FlexItem>
          <Button>
            <Icon icon='star-empty' className='mark-as-correct' />
          </Button>
        </FlexItem>
        <FlexItem>
          <Button className='attention-delete' isLink>
            Delete
          </Button>
        </FlexItem>
      </Flex>
      <Button isPrimary>Add Another Answer</Button>
    </div>
  );
}
