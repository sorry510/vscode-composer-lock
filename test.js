function getContentHash(content) {

    const relevantKeys = [
        'name',
        'version',
        'require',
        'require-dev',
        'conflict',
        'replace',
        'provide',
        'minimum-stability',
        'prefer-stable',
        'repositories',
        'extra',
    ];

    let relevantContent = {};

    for (let key of relevantKeys.filter(key => key in content)) {
        relevantContent[key] = content[key];
    }

    if ('config' in content && 'platform' in content.config) {
        relevantContent.config = { platform: content.config.platform };
    }

    Object.keys(relevantContent).sort().forEach(key => {
        // Ensure the object keys are sorted
        if (typeof relevantContent[key] === 'object' && !Array.isArray(relevantContent[key])) {
            Object.keys(relevantContent[key]).sort().forEach(subKey => {
                relevantContent[key][subKey] = relevantContent[key][subKey];
            });
        }
    });

    return md5(JSON.stringify(relevantContent));
}

// 使用 crypto 模块来计算 MD5 哈希
const crypto = require('crypto');

function md5(input) {
    return crypto.createHash('md5').update(input).digest('hex');
}

// 示例用法
const composerJson = {
    "minimum-stability": "dev",
    "prefer-stable": true,
    "repositories": [
      {
        "type": "vcs",
        "url": "https://github.com/poper-inc/silexcane"
      },
      {
        "type": "vcs",
        "url": "https://github.com/poper-inc/silex-capsule"
      },
      {
        "type": "vcs",
        "url": "https://github.com/poper-inc/auth0-PHP.git"
      },
      {
        "type": "vcs",
        "url": "https://github.com/poper-inc/auth0-php-jwt.git"
      }
    ],
    "require": {
      "php": "~8.2.0",
      "ext-bcmath": "*",
      "ext-gd": "*",
      "ext-imagick": "*",
      "ext-json": "*",
      "ext-mbstring": "*",
      "ext-pcntl": "*",
      "ext-posix": "*",
      "ext-redis": "*",
      "10mado/silexcane": "1.0.12",
      "amstaffix/pagination": "~1.1",
      "auth0/auth0-php": "dev-dev-7.9.0",
      "auth0/php-jwt": "dev-dev-3.3.4",
      "aws/aws-php-sns-message-validator": "^1.7",
      "aws/aws-sdk-php": "~3.0",
      "casbin/casbin": "^2.1",
      "clover/text-forbidden-words": "~1.0",
      "doctrine/cache": "~1",
      "doctrine/dbal": "~2.5",
      "elasticsearch/elasticsearch": "^7.17",
      "endroid/qr-code": "^3.2",
      "ezyang/htmlpurifier": "~4.8",
      "firebase/php-jwt": "^5.0",
      "google/apiclient": "^2.12.1",
      "guzzlehttp/promises": "1.5.2",
      "guzzlehttp/psr7": "1.9.0",
      "hashids/hashids": "^4.0",
      "illuminate/encryption": "~6.0",
      "illuminate/pagination": "~6.0",
      "intervention/image": "^2.4",
      "jean85/pretty-package-versions": "1.6.0",
      "kreait/firebase-php": "^5.19",
      "league/oauth2-server": "^8.3",
      "linecorp/line-bot-sdk": "^3.0",
      "mobiledetect/mobiledetectlib": "^2.8",
      "moneyphp/money": "^4.3",
      "monolog/monolog": ">=1.0.0",
      "omise/omise-php": "v2.17.0",
      "php-amqplib/php-amqplib": "^v3.0.0",
      "php-http/client-common": "2.5.0",
      "phpoffice/phpspreadsheet": "^1.4",
      "pmaxs/silex-locale": "^1.0",
      "pragmarx/google2fa": "^8.0",
      "sendgrid/sendgrid": "~7",
      "sentry/sdk": "3.2.0",
      "sentry/sentry": "3.7.0",
      "silex/silex": "~1.2",
      "swiftmailer/swiftmailer": "6.2.3",
      "symfony/config": "^3.3",
      "symfony/dom-crawler": "~3.0.0",
      "symfony/http-client": "5.4.12",
      "symfony/process": "^5.4",
      "symfony/translation": "^3.3",
      "symfony/var-dumper": "^3.2",
      "symfony/yaml": "^3.3",
      "twig/extensions": "~1.1",
      "twig/twig": ">=1.8,<2.0@dev",
      "vlucas/valitron": "v1.4.7",
      "ziadoz/silex-capsule": "1.*"
    },
    "require-dev": {
      "dongww/silex-debugbar": "*",
      "fakerphp/faker": "^1.23",
      "mockery/mockery": "~1.0",
      "phpstan/phpstan": "^1.8",
      "phpunit/phpunit": "^8.5.12",
      "sebastian/diff": "^3",
      "symfony/finder": "^4.3.4",
      "vlucas/phpdotenv": "~1.0",
      "whoops/silex-1": "*"
    },
    "autoload": {
      "classmap": [
        "database/factories"
      ],
      "psr-0": {
        "App": "src/"
      },
      "files": [
        "src/App/helpers.php",
        "boot/package_patch/symfony/http-foundation/ParameterBag.php",
        "boot/package_patch/symfony/http-foundation/FileBag.php",
        "src/App/Modules/Omise/OmiseApiResource.php"
      ],
      "exclude-from-classmap": [
        "vendor/symfony/http-foundation/ParameterBag.php",
        "vendor/symfony/http-foundation/FileBag.php",
        "vendor/omise/omise-php/lib/omise/res/OmiseApiResource.php"
      ]
    },
    "autoload-dev": {
      "psr-4": {
        "Tests\\": "tests/"
      }
    },
    "scripts": {
      "pre-autoload-dump": [
        "Google\\Task\\Composer::cleanup"
      ],
      "post-install-cmd": [
        "@php src/create_asset_files.php"
      ],
      "docker-yarn": [
        "Composer\\Config::disableProcessTimeout",
        "docker run --rm -it -v $(pwd):/code --workdir /code node:10.16.0 yarn "
      ],
      "phpstan": [
        "vendor/bin/phpstan analyse > phpstan.log"
      ]
    },
    "config": {
      "preferred-install": "dist",
      "sort-packages": true,
      "optimize-autoloader": true
    },
    "extra": {
      "google/apiclient-services": [
        "Oauth2"
      ]
    }
  };
  

console.log(getContentHash(composerJson));