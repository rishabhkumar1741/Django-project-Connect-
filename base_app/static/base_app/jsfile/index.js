var after = ""

document.getElementById('rispost').addEventListener('click',
function () {
    document.querySelector('.bg-modal-post').style.display = 'flex';
    });


document.querySelector('.close-post').addEventListener('click',
    function () {
    console.log("rishabh")
    document.querySelector('.bg-modal-post').style.display = 'none';
    });






fetch(`https://www.reddit.com/r/memes.json`)
    .then(response => response.json())
    .then(data => {    
        after = data.data.after
        console.log("rishabh",after)  
        
        data.data.children.forEach(element => { 
            if (element.data.post_hint == 'image')
            {
            var itm = document.getElementById('ris_container');
      
            document.getElementById('postheading').innerHTML = element.data.title ;    
            var cln = itm.cloneNode(true);
            var selectsss = cln.getElementsByTagName('img');
            selectsss[0].src = element.data.url_overridden_by_dest;
            document.getElementById('ris_card_col').append(cln);                
            }       
        });
    });

window.onscroll =  function() {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight)
    {
        fetch(`https://www.reddit.com/r/memes.json?after=${after}`)
        .then(response => response.json())
        .then(data => {    
        after=data.data.after
        data.data.children.forEach(element => { 
            if (element.data.post_hint == 'image')
            {
            var itm = document.getElementById('ris_container');      
            document.getElementById('postheading').innerHTML = element.data.title ;    
            var cln = itm.cloneNode(true);
            var selectsss = cln.getElementsByTagName('img');
            selectsss[0].src = element.data.url_overridden_by_dest;
            document.getElementById('ris_card_col').append(cln);                
            }       
        });
    });

        
    }
}




