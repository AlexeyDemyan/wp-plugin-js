// we added the wp namespace as a dependency in wp_enqueue_script in index.php
wp.blocks.registerBlockType('alex-attention-plugin/are-you-paying-attention', {
  title: 'Are You Paying Attention?',
  icon: 'smiley',
  category: 'common',
  attributes: {
    // type parameter is the required one
    skyColor: { type: 'string' },
    grassColor: { type: 'string' },
  },
  // Edit function controls what shows in Admin Post Editor screen
  edit: (props) => {
    function updateSkyColor(e) {
      props.setAttributes({ skyColor: e.target.value });
    }

    function updateGrassColor(e) {
      props.setAttributes({ grassColor: e.target.value });
    }

    return (
      <div>
        <input
          type='text'
          placeholder='sky color'
          value={props.attributes.skyColor}
          onChange={updateSkyColor}
        />
        <input
          type='text'
          placeholder='grass color'
          value={props.attributes.grassColor}
          onChange={updateGrassColor}
        />
      </div>
    );
  },
  // Save function controls what actual plebs will see in the content
  save: (props) => {
    return (
      <p>
        Today the sky is {props.attributes.skyColor} and grass is{' '}
        {props.attributes.grassColor}
      </p>
    );
  },
});
