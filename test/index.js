'use strict';

var fs = require('fs');
var postcss = require('postcss');
var test = require('tape');
var extend = require('..');

function fixturePath(name) {
  return 'test/fixtures/' + name + '.css';
}

function fixture(name) {
  return fs.readFileSync(fixturePath(name), 'utf8').trim();
}

function compareFixtures(t, name) {
  var actualCss = postcss(extend)
    .process(fixture(name), { from: fixturePath(name) })
    .css
    .trim();

  fs.writeFile(fixturePath(name + '.actual'), actualCss);

  var expectedCss = fixture(name + '.expected');

  return t.equal(
    actualCss,
    expectedCss,
    'processed fixture ' + name + ' should be equal to expected output'
  );
}

function p(css) {
  return postcss(extend).process(css).css;
}

test('@define-placeholder basically works', function(t) {
  compareFixtures(t, 'basic');
  t.end();
});

test('@define-placeholder with special characters works', function(t) {
  compareFixtures(t, 'specialchars-placeholder');
  t.end();
});

test('@define-placeholder works with several added selectors', function(t) {
  compareFixtures(t, 'several-additions');
  t.end();
});

test('@define-placeholder works when adding selector groups', function(t) {
  compareFixtures(t, 'adding-groups');
  t.end();
});

test('@define-placeholder treats whitespace as intended', function(t) {
  compareFixtures(t, 'whitespace');
  t.end();
});

test('@define-placeholder works with a variety of selectors', function(t) {
  compareFixtures(t, 'selector-varieties');
  t.end();
});

test('@define-placeholder works when the addto rule set is otherwise empty', function(t) {
  compareFixtures(t, 'only-addto');
  t.end();
});

test('%placeholder basically works', function(t) {
  compareFixtures(t, 'basic-silent');
  t.end();
});

test('%placeholder works with several added selectors', function(t) {
  compareFixtures(t, 'several-additions-silent');
  t.end();
});

test('%placeholder works when adding selector groups', function(t) {
  compareFixtures(t, 'adding-groups-silent');
  t.end();
});

test('%placeholder treats whitespace as intended', function(t) {
  compareFixtures(t, 'whitespace-silent');
  t.end();
});

test('%placeholder works with a variety of selectors', function(t) {
  compareFixtures(t, 'selector-varieties-silent');
  t.end();
});

test('%placeholder works when the addto rule set is otherwise empty', function(t) {
  compareFixtures(t, 'only-addto-silent');
  t.end();
});

test('extending rules directly basically works', function(t) {
  compareFixtures(t, 'basic-direct');
  t.end();
});

test('extending into special character selectors', function(t) {
  compareFixtures(t, 'specialchars-direct');
  t.end();
});

test('extending rules directly works with several added selectors', function(t) {
  compareFixtures(t, 'several-additions-direct');
  t.end();
});

test('extending rules directly works when adding selector groups', function(t) {
  compareFixtures(t, 'adding-groups-direct');
  t.end();
});

test('extending rules directly treats whitespace as intended', function(t) {
  compareFixtures(t, 'whitespace-direct');
  t.end();
});

test('extending rules directly works with a variety of selectors', function(t) {
  compareFixtures(t, 'selector-varieties-direct');
  t.end();
});

test('extending rules directly works when the addto rule set is otherwise empty', function(t) {
  compareFixtures(t, 'only-addto-direct');
  t.end();
});

test('@define doesn\'t work in an anti-pattern', function(t) {
  compareFixtures(t, 'antipattern');
  t.end();
});

test('%placeholder works even in an anti-pattern', function(t) {
  compareFixtures(t, 'antipattern-silent');
  t.end();
});

test('silent placeholders work even when emplaced among other selectors', function(t) {
  compareFixtures(t, 'silent-emplaced');
  t.end();
});

test('direct extensions work even in an anti-pattern', function(t) {
  compareFixtures(t, 'antipattern-direct');
  t.end();
});

test('removes duplicate selectors automatically', function(t) {
  compareFixtures(t, 'duplicate-selectors');
  t.end();
});


test('happily extending style-less components ', function(t) {
  compareFixtures(t, 'BEM-emptytargets');
  t.end();
});

test('can extend sub-rules of target extension', function(t) {
  compareFixtures(t, 'sub-root');
  t.end();
});

test('recursive actions on extended sub-rules', function(t) {
  compareFixtures(t, 'sub-recursive');
  t.end();
});

test('doesn\'t utilize existing sub rules at root', function(t) {
  compareFixtures(t, 'sub-int-root');
  t.end();
});

test('extending in media has (safe) pull-in behavior, and basic behavior in scope', function(t) {
  compareFixtures(t, 'media-basic');
  t.end();
});

test('extending into media placeholders from root works correctly', function(t) {
  compareFixtures(t, 'media-placeholder');
  t.end();
});

test('placeholders in media self-remove if not called', function(t) {
  compareFixtures(t, 'media-placeholder-mt');
  t.end();
});

test('extending in media retains priority of declarations that are pulled', function(t) {
  compareFixtures(t, 'media-prio');
  t.end();
});

test('extending in media doesn\'t utilize existing rules in-scope', function(t) {
  compareFixtures(t, 'media-sub');
  t.end();
});

test('extending in media will create sub rules (in-scope) for targets out of scope', function(t) {
  compareFixtures(t, 'media-advanced-sub');
  t.end();
});

test('extending in media uses existing rules in-scope for external targets', function(t) {
  compareFixtures(t, 'media-sub-ext');
  t.end();
});

test('extending in media perserves declaration priority of external targets', function(t) {
  compareFixtures(t, 'media-sub-ext-prio');
  t.end();
});

test('cross-media extensions pull in correctly (aka: they don\'t)', function(t) {
  compareFixtures(t, 'media-cross-media');
  t.end();
});

test('has predicatable, logical ordering of selectors', function(t) {
  compareFixtures(t, 'selector-order');
  t.end();
});

test('bidirectionally recursive behavior on direct extensions', function(t) {
  compareFixtures(t, 'recursion-bidirectional');
  t.end();
});

test('full recursion even in badly-formed CSS', function(t) {
  compareFixtures(t, 'recursion-full');
  t.end();
});

test('properly handled recursion among silent placeholders', function(t) {
  compareFixtures(t, 'recursion-silenthop');
  t.end();
});

test('full recursion even with placeholders in badly-formed CSS', function(t) {
  compareFixtures(t, 'recursion-infinite-placeholders');
  t.end();
});

test('infinite recursion handling in badly-formed CSS', function(t) {
  compareFixtures(t, 'recursion-infinite');
  t.end();
});

test('infinite recursion handling around @media in badly-formed CSS', function(t) {
  compareFixtures(t, 'recursion-infinite-media');
  t.end();
});

test('preventing simple slippage while recursion handling (Thanks Komlev)', function(t) {
  compareFixtures(t, 'recursion-slippage');
  t.end();
});

test('extend multiple, comma-separated classes', function(t) {
  compareFixtures(t, 'commas');
  t.end();
});

test('extend multiple, comma-separated classes w/ media', function(t) {
  compareFixtures(t, 'commas-media');
  t.end();
});


/*END OF FILEBORN TESTS ----------------*/
test('works when invoked with () or without', function(t) {
  var someCss = '@define-placeholder bar { background: pink; } .foo { @extend bar; }';

  t.equal(
    postcss(extend).process(someCss).css,
    postcss(extend()).process(someCss).css
  );

  t.end();
});

test('accepts alternative at-rules', function(t) {
  var standard = p('@define-placeholder bar { background: pink; } .foo { @extend bar; }');
  t.equal(
    p('@define-extend bar { background: pink; } .foo { @extend bar; }'),
    standard
  );
  t.end();
});

test('eliminates unused definition', function(t) {
  t.equal(p('@define-placeholder foo { background: pink; }'), '');
  t.end();
});

test('removes unused definition selector', function(t) {
  t.equal(p('@define-placeholder foo, .bar { background: pink; }'), '.bar { background: pink;\n}');
  t.end();
});

test('eliminates unused silent rule', function(t) {
  t.equal(p('%foo { background: pink; }'), '');
  t.end();
});

test('removes unused silent selector', function(t) {
  t.equal(p('%foo, .bar { background: pink; }'), '.bar { background: pink; }');
  t.end();
});

test('eliminates faulty extension', function(t) {
  t.equal(p('.foo { color: white; @extend baz; }'), '.foo { color: white; }');
  t.end();
});

test('eliminates faulty extension-only rule', function(t) {
  t.equal(p('.foo { @extend baz; }'), '');
  t.end();
});

require('./warnings');
