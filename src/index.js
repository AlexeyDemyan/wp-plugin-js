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
      <h6>
        Today the sky is totally{' '}
        <span className='skyColor'>{props.attributes.skyColor}</span> and grass
        is <span className='grassColor'>{props.attributes.grassColor}.</span>
      </h6>
    );
  },
  // has to be "deprecated" as it is a reserved name. It helps to keep old structure of Save() when we make changes
  deprecated: [
    {
      attributes: {
        skyColor: { type: 'string' },
        grassColor: { type: 'string' },
      },
      save: (props) => {
        return (
          <p>
            Today the sky is{' '}
            <span className='skyColor'>{props.attributes.skyColor}</span> and
            grass is{' '}
            <span className='grassColor'>{props.attributes.grassColor}.</span>
          </p>
        );
      },
    },
    {
      attributes: {
        skyColor: { type: 'string' },
        grassColor: { type: 'string' },
      },
      save: (props) => {
        return (
          <p>
            Today the sky is{' '}
            <span className='skyColor'>{props.attributes.skyColor}</span> and
            grass is{' '}
            <span className='grassColor'>{props.attributes.grassColor}.</span>
          </p>
        );
      },
    },
  ],
});
