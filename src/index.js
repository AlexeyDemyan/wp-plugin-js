// we added the wp namespace as a dependency in wp_enqueue_script in index.php
wp.blocks.registerBlockType('alex-attention-plugin/are-you-paying-attention', {
  title: 'Are You Paying Attention?',
  icon: 'smiley',
  category: 'common',
  attributes: {
    // type property is the required one, and source with selector allows to place data better in DB
    // Ghax otherwise WP will be store copy of attribute data in a comment of the element in DB, which is kinda weird
    skyColor: { type: 'string', source: 'text', selector: '.skyColor' },
    grassColor: { type: 'string', source: 'text', selector: '.grassColor' },
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
        Today the sky is{' '}
        <span className='skyColor'>{props.attributes.skyColor}</span> and grass
        is <span className='grassColor'>{props.attributes.grassColor}.</span>
      </p>
    );
  },
});
