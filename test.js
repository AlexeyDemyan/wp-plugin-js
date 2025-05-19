// we added the wp namespace as a dependency in wp_enqueue_script in index.php
wp.blocks.registerBlockType('alex-attention-plugin/are-you-paying-attention', {
    title: "Are You Paying Attention?",
    icon: "smiley",
    category: "common",
    // Edit function controls what shows in Admin Post Editor screen
    edit: () => {
        // Args: 1) element to be created
        // 2) attributes to give to the element - inline-style, class
        // 3) children/content for the element
        return wp.element.createElement("h3", null, "Ping from the admin editor screen");
    },
    // Save function controls what actual plebs will see in the content
    save: () => {
        return wp.element.createElement("h1", null, "Ping from the Front End");
    }
});