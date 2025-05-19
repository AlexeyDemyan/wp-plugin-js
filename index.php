<?php

/*
    Plugin name: Alex Attenion Quiz Plugin
    Description: Adding multiple choice quiz to blog posts
    Version: 1.0
    Author: Alex
    Author URI: https://github.com/AlexeyDemyan
*/

if (! defined('ABSPATH')) exit; // Exit if accessed directly

class AttentionCheckQuiz
{
    function __construct()
    {
        add_action('init', array($this, 'adminAssets'));
    }

    function adminAssets()
    {
        // 3rd arg is an array of dependencies: wp-blocks mandatory to have access to WP namespace in JS
        // wp-element is here to play it safe, supposed everything will work without specifying it
        // but like this we make sure this will be pre-loaded before WP loads our js file

        // Now as opposed to queueing up the script, we first register it and then reference it in register_block_type
        // render_callback takes a function responsible for rendering HTML on the Frontend for the plebs
        wp_register_script('newBlockType', plugin_dir_url(__FILE__) . 'build/index.js', array('wp-blocks', 'wp-element'));
        register_block_type('alex-attention-plugin/are-you-paying-attention', array(
            'editor_script' => 'newBlockType',
            'render_callback' => array($this, 'theHTML')
        ));
    }

    function theHTML($attributes)
    {   
        // Could use escape functions to sanitize the input, but in this case might give admin power to enter actual HTML here
        return '<p>Todayasfasfsagf the sky is ' . $attributes['skyColor'] . ' and the grass is ' . $attributes['grassColor'] . '!!!!!!</p>';
    }
}

$attentionCheckQuiz = new AttentionCheckQuiz();
