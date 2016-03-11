/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */


$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* done: Write a test that loops through each feed
         * in the allFeeds object and ensures it has an non empty URL defined
         * and that the URL is not empty.
         */
        it ('have non empty urls', function(){
            allFeeds.forEach(function (feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
        });


        /* done: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it ('have defined names', function(){
            allFeeds.forEach(function (feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0); //toBe(0) checks for length of name String
            });
        });
    });


    describe("The Menu", function() {

        /* done: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('is hidden by default', function(){
           expect($('body')).toHaveClass('menu-hidden');
        });

        /* done: Write a test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        it('is shown when clicked and hidden when clicked again', function(){
            body = $('body');
            menuIcon = $('.menu-icon-link');
            // should be self explainatory
            menuIcon.click();
            expect(body).not.toHaveClass('menu-hidden');
            menuIcon.click();
            expect(body).toHaveClass('menu-hidden');
        });

    });


    describe("filling the feed", function() {


        /* done: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

        // load the feed asynchronously from testing entries
        beforeEach(function(done){
            loadFeed(0, done)
        });
        // when the loadFeed function has been completed, test if the feed includes at least one entry element
        // I would have rather solved this using .toContainElement('.entry') but that didnt work for me
        it ('includes at least one entry class item', function(){
            expect($('.feed .entry').length).toBeGreaterThan(0);
        });
    });


    describe("New Feed Selection", function(){
        /* done: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */

        var feedA;
        var feedB;

        // load the feed two times and save each feed so they can be compared
        beforeEach(function(done){
            loadFeed(0);
            feedA = $('.feed');
            loadFeed(1, function(){
                feedB = $('.feed');
                done();
            });
        });
        // when the loadFeed function has been completed, test if the feed includes at least one entry element
        // I would have rather solved this using .toContainElement('.entry') but that didnt work for me
        it ('creates a new feed', function(done){
            //compare the two feeds to check if the new one is actually different
            expect(feedA === feedB).toBeFalsy();
            //check that the new feed isnt empty
            expect(feedB).not.toBe(0);
            done();
        });

    });


    describe("BONUS - Feed item remover button", function(){
        /* This tests an imaginary delete button displayed next to each entry
         */
        var feedA;


        // initialize a feed
        beforeEach(function(done){
            loadFeed(1, function(){
                feedA = $('.feed');
                done();
            });
        });


        xit ('displays a button for each entry', function(){
            //check each entry, if it has a deleteButton attached
            $('.feed').find('.entry').forEach(function(entry){
                expect(entry.find('.deleteButton')).toExist();
            });

        });
        xit ('removes the link it is assigned to', function(){
            // PUSH THE BUTTON
            $('.feed').find('.entry')[0].find('.deleteButton').click();
            //clicking this button would make the item disapear.
            expect($('.feed').find('.entry')[0]).not.toBeVisible();
        });


    });


}());
