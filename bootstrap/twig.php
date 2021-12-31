<?php

use Twig\Environment as TwigEnvironment;
use Twig\Loader\FilesystemLoader as TwigFilesystemLoader;
use Twig\TwigFilter;
use Twig\TwigFunction;
use App\Core\Translate;

function view(string $name, array $params = [])
{
    // Where the templates are held.
    $loader = new TwigFilesystemLoader(__DIR__ . '/../app/views');

    // Where to cache the compiled templates.
    // Default is 'cache' => false.
    // Set 'cache' => 'path/to/cache/folder' if caching is required.
    $twig = new TwigEnvironment($loader, array(
        'cache' => 'local' !== env('APP_ENV') ? __DIR__ . '/../storage/cache/twig' : false
    ));

    // Extend Twig with custom filters (twig filter name, callback, options).
    $highlight = new TwigFilter('highlight', 'highlight', ['is_safe' => ['html']]);
    $twig->addFilter($highlight);

    // Extend Twig with custom functions (twig function name, callback, options).
    $lorem = new TwigFunction('lorem', 'lorem');
    $twig->addFunction($lorem);

    // translate text based on yaml files in ./resources/lang.
    $trans = new TwigFunction('_', 'trans', ['is_safe' => ['html']]);
    $twig->addFunction($trans);

    return $twig->render("{$name}.twig", $params);
}

function trans(string $text)
{
    $translate = new Translate();

    return $translate->get($text);
}

function highlight(string $message, string $type)
{
    switch ($type) {
        case 'warning':
            return '<span class="body--warning">' . $message . '</span>';

        case 'success':
            return '<span class="body--success">' . $message . '</span>';

        case 'complete':
            return '<span class="body--complete">' . $message . '</span>';

        default:
            return $message;
    }
}

function lorem(int $count)
{
    $ipsum = <<<EOD
        The game's not big enough unless it scares you a little. We could cause a diplomatic crisis.
        Take the ship into the Neutral Zone Fate protects fools, little children and ships named Enterprise.
        Fear is the true enemy, the only enemy. And blowing into maximum warp speed,
        you appeared for an instant to be in two places at once. I'm afraid I still don't understand, sir.
        Mr. Crusher, ready a collision course with the Borg ship.
        You're going to be an interesting companion, Mr. Data. Wait a minute, you've been declared dead.
        You can't give orders around here. Ensign Babyface! Smooth as an android's bottom, eh, Data?
        Mr. Worf, you do remember how to fire phasers? Not if I weaken first. This should be interesting.
        Commander William Riker of the Starship Enterprise.
    EOD;

    $ipsumArray = array_filter(explode(" ", $ipsum), function ($value, $key) {
        return '' != $value && "\n" != $value;
    }, ARRAY_FILTER_USE_BOTH);

    $wordCount = count($ipsumArray);

    if ($count > $wordCount || $count > getrandmax()) {
        return $ipsum;
    }

    $offset = mt_rand(0, $wordCount - $count);

    return implode(" ", array_slice($ipsumArray, $offset, $count));
}
