// 1 (3) Output to the console the <ol> element encompassing the results of the search
// Getting all elements by tag name 'ol', and returning the first item in the collection using bracket notation.
document.getElementsByTagName('ol')[0]
// <ol id=​"b_results" role=​"main" aria-label=​"Search Results">​…​</ol>​

// 2 (4) Output to the console the code for the "onload" event on the <body> element
// Using dot notation to get the onload function, which is stored on the document.body object. 
// ommiting the () keeps the method from being called and simply returns the method.
document.body.onload
// ƒ (){_G.BPT=new Date;n&&n();!_w.sb_ppCPL&&t&&sb_st(function(){t(new Date)},0)}

// 3 (3) Output to the console the 2nd child node underneath the <body> element
// .children to return a collection of children, [1] to return the second element in that collection
document.body.children[1]
// <script type=​"text/​javascript">​…​</script>​

// 4 (3) Output to the console the number of <h2> tags in the page
// Using getElementsByTagName to get all of them, and calling length on the collection to get the length
document.getElementsByTagName('h2').length
// 12

// 5 (3) Output to the console the value in the search bar (you must get this from the search bar not anywhere else on the page)
// get a collection of all inputs, use bracket notation to get the first, and .value to get the text from within it.
document.getElementsByTagName('input')[0].value
// trumpet ocean walk


// 6 (4) Make the "Make Bing your seach engine" text in the upper right corner result go away

// !!!!!

// I actually can't see "Make Bing your search engine" in the first place! Maybe because I'm not in the US, so it renders different. 
// Here is the code that makes where it says "Sign in" go away instead, but you will have to fix this.
// targets element by id, uses the style property to give it a display: none
document.getElementById('id_s').style.display = 'none';
"none"
