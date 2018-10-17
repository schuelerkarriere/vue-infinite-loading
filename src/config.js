/*
 * default property values
 */

const props = {
  // the default spinner type
  spinner: 'default',

  // the default critical distance
  distance: 100,

  // the default force use infinite wrapper flag
  forceUseInfiniteWrapper: false,
};

/**
 * default system settings
 */

const system = {
  // the default throttle space of time
  throttleLimit: 50,

  // the timeout for check infinite loop, unit: ms
  loopCheckTimeout: 1000,

  // the max allowed number of continuous calls, unit: ms
  loopCheckMaxCalls: 10,
};

/**
 * default slot messages
 */
const slots = {
  noResults: 'No results :(',
  noMore: 'No more data :)',
};

/**
 * the 3rd argument for event bundler
 * @see https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md
 */

export const evt3rdArg = (() => {
  let result = false;

  try {
    const arg = Object.defineProperty({}, 'passive', {
      get() {
        result = { passive: true };
        return true;
      },
    });

    window.addEventListener('testpassive', arg, arg);
    window.remove('testpassive', arg, arg);
  } catch (e) { /* */ }

  return result;
})();

/**
 * warning messages
 */

export const WARNINGS = {
  STATE_CHANGER: [
    '[Vue-infinite-loading warn]: emit `loaded` and `complete` event through component instance of `$refs` may cause error, so it will be deprecated soon, please use the `$state` argument instead (`$state` just the special `$event` variable):',
    '\ntemplate:',
    '<infinite-loading @infinite="infiniteHandler"></infinite-loading>',
    `
script:
...
infiniteHandler($state) {
  ajax('https://www.example.com/api/news')
    .then((res) => {
      if (res.data.length) {
        $state.loaded();
      } else {
        $state.complete();
      }
    });
}
...`,
    '',
    'more details: https://github.com/PeachScript/vue-infinite-loading/issues/57#issuecomment-324370549',
  ].join('\n'),
  INFINITE_EVENT: '[Vue-infinite-loading warn]: `:on-infinite` property will be deprecated soon, please use `@infinite` event instead.',
  IDENTIFIER: '[Vue-infinite-loading warn]: the `reset` event will be deprecated soon, please reset this component by change the `identifier` property.',
};

/**
 * error messages
 */

export const ERRORS = {
  INFINITE_LOOP: [
    `[Vue-infinite-loading error]: executed the callback function more than ${system.loopCheckMaxCalls} times for a short time, it looks like searched a wrong scroll wrapper that doest not has fixed height or maximum height, please check it. If you want to force to set a element as scroll wrapper ranther than automatic searching, you can do this:`,
    `
<!-- add a special attribute for the real scroll wrapper -->
<div infinite-wrapper>
  ...
  <!-- set force-use-infinite-wrapper -->
  <infinite-loading force-use-infinite-wrapper></infinite-loading>
</div>
or
<div class="infinite-wrapper">
  ...
  <!-- set force-use-infinite-wrapper as css selector of the real scroll wrapper -->
  <infinite-loading force-use-infinite-wrapper=".infinite-wrapper"></infinite-loading>
</div>
    `,
    'more details: https://github.com/PeachScript/vue-infinite-loading/issues/55#issuecomment-316934169',
  ].join('\n'),
};

export default {
  mode: 'development',
  props,
  system,
  slots,
  WARNINGS,
  ERRORS,
};
