class ContextMenu extends HTMLElement {
 constructor (){
  super()
  var shadow = this.attachShadow({mode: 'open'});
  this.wrapper = document.createElement('ul');
  this.wrapper.classList.add("menu-wrapper");
  var menuHtml = "";
  var items = (this.getAttribute("menu") ? this.getAttribute("menu").split(";") : []);
  for(var i = 0;i < items.length;i++){
   menuHtml += "<li data-name='" + items[i].split(":")[1] + "'>" + items[i].split(":")[0] + "</li>";
  };
  this.wrapper.innerHTML = menuHtml;
  shadow.appendChild(this.wrapper);
  const style = document.createElement("STYLE");
  style.textContent = `
.menu-wrapper {
 border: solid 1px black;
 padding: 0px;
 position: fixed;
 background: white;
 color: black;
 display: none;
 max-width: 200px;
 font-family: Arial, sans-serif;
 user-select: none;
 list-style: none;
}
.menu-wrapper li {
 padding: 5px;
}
.menu-wrapper li:hover {
 background: #ddd;
}
 `;
  shadow.appendChild(style);
  shadow.addEventListener("click",function (e){
   if(e.target.getAttribute("class") === "menu-wrapper" || e.target.parentElement.getAttribute("class") === "menu-wrapper"){
    if(e.target.parentElement.getAttribute("class") === "menu-wrapper"){
     window[e.target.getAttribute("data-name")](e.target);
     e.target.parentElement.style.display = "none"
    }
   }else{
    for(var i = 0;i < document.getElementsByClassName("menu-wrapper").length;i++){
     document.getElementsByClassName("menu-wrapper")[0].style.display = "none"
    }
   };
  });
  this.addEventListener("contextmenu",function (e){
   e.preventDefault();
   this.wrapper.style.display = "block";
   this.wrapper.style.left = e.clientX + "px";
   this.wrapper.style.top = e.clientY + "px";
  })
 }
}
window.addEventListener("load",function (){
 customElements.define("context-menu", ContextMenu);
 document.addEventListener("click",function (e){
  if(e.target.getAttribute("class") === "menu-wrapper" || e.target.parentElement.getAttribute("class") === "menu-wrapper"){
   if(e.target.parentElement.getAttribute("class") === "menu-wrapper"){
    window[e.target.getAttribute("data-name")](e.target);
    e.target.parentElement.style.display = "none"
   }
  }else{
   for(var i = 0;i < document.getElementsByClassName("menu-wrapper").length;i++){
    document.getElementsByClassName("menu-wrapper")[0].style.display = "none"
   }
  };
 })
})
