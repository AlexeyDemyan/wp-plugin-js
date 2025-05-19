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
        add_action('enqueue_block_editor_assets', array($this, 'adminAssets'));
    }

    function adminAssets()
    {   
        // 3rd arg is an array of dependencies: wp-blocks mandatory to have access to WP namespace in JS
        // wp-element is here to play it safe, supposed everything will work without specifying it
        // but like this we make sure this will be pre-loaded before WP loads our js file
        wp_enqueue_script('newBlockType', plugin_dir_url(__FILE__) . 'test.js', array('wp-blocks', 'wp-element'));
    }
}

$attentionCheckQuiz = new AttentionCheckQuiz();
