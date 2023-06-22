<?php
/**
 * Plugin Name: LiuLock Synthethics™ Reactable Trending Posts Commentary
 * Version: 2.0.0
 * Plugin URI: https://github.com/ZIPING-LIU-CORPORATION/liulock-reactable-synthethics-chatblock
 * Description: A Wordpress Plugin Demonstrating Usage of same \"rendering\" code with \"Save\" and \"Edit\" callbacks of a Custom Block. Renders a Custom Block that functions as a chat box for awscyber.ai, and also allows additional gutenberg innerblocks if desired
 * Author: LIU LLC
 * Author URI: https://wakatime.com/@aws
 * License:           GPL v2 or later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 */
if (!function_exists("liu_synthethics_reactable_trending_commentary_block")) {
    function liu_synthethics_reactable_trending_commentary_block()
    {
        register_block_type(dirname(__FILE__) . "/build/block.json");
    }
}
add_action("init", "liu_synthethics_reactable_trending_commentary_block");
?>
