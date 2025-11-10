let container = document.querySelector(".content");
let home = document.querySelector(".home");

fetch("data.json")
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    function type() {
      for (let i in data) {
        let reg = document.createElement("div");
        reg.classList.add("contry");
        // image
        let regimg = document.createElement("img");
        regimg.src = data[i].flags.png;

        // name
        let regname = document.createElement("h3");
        regname.textContent = data[i].name;
        regname.onclick = function () {
          home.style.display = "none";
          let detail = document.createElement("main");
          detail.classList.add("detail");
          // back btn
          let back = document.createElement("button");
          back.classList.add("back");
          back.innerHTML = `<i class="fa-solid fa-arrow-left"></i>Back`;
          back.onclick = function () {
            detail.style.display = "none";
            home.style.display = "flex";
          };
          // flag
          let flag = document.createElement("img");
          flag.classList.add("flag");
          flag.src = data[i].flags.png;
          // descreption
          let descreption = document.createElement("div");
          descreption.classList.add("desc");
          // title
          let title = document.createElement("h1");
          title.textContent = data[i].name;
          // infos
          let info = document.createElement("div");
          info.classList.add("info");
          // native name
          let native = document.createElement("p");
          native.innerHTML = `Native Name: <span>${data[i].nativeName}</span>`;
          // population
          let population = document.createElement("p");
          population.innerHTML = `Population: <span>${data[i].population}</span>`;
          // region
          let region = document.createElement("p");
          region.innerHTML = `Region: <span>${data[i].region}</span>`;
          // sub region
          let subregion = document.createElement("p");
          subregion.innerHTML = `Sub Region: <span>${data[i].subregion}</span>`;
          // capital
          let capital = document.createElement("p");
          capital.innerHTML = `Capital: <span>${data[i].capital}</span>`;
          // tldomain
          let tldomain = document.createElement("p");
          tldomain.innerHTML = `Top Level Domain: <span>${data[
            i
          ].topLevelDomain.join(", ")}</span>`;
          // currencies
          let cur = document.createElement("p");
          let curarr = [];
          data[i].currencies.forEach((el) => {
            curarr.push(el.name);
          });
          console.log(curarr);
          cur.innerHTML = `Currencies: <span>${curarr.join(", ")}</span>`;
          // langs
          let langs = document.createElement("p");
          let langarr = [];
          data[i].languages.forEach((el) => {
            langarr.push(el.name);
          });
          langs.innerHTML = `Languages: <span>${langarr.join(", ")}</span>`;
          // border
          let border = document.createElement("div");
          border.classList.add("border");
          new Promise((res, rej) => {
            if (Object.keys(data[i]).includes("borders")) {
              res(data[i].borders);
            } else {
              rej("Sorry");
            }
          }).then(
            (borders) => {
              border.textContent = "Border Contries:";
              // border conties
              borders.forEach((el) => {
                let borcon = document.createElement("div");
                borcon.classList.add("border-con");
                for (let j = 0; j < data.length; j++) {
                  if (data[j].alpha3Code === el) {
                    borcon.textContent = data[j].name;
                    break;
                  }
                }
                border.append(borcon);
              });
            },
            (rej) => console.log(rej)
          );

          //finaly
          info.append(
            native,
            population,
            region,
            subregion,
            capital,
            tldomain,
            cur,
            langs
          );
          descreption.append(title, info, border);
          detail.append(back, flag, descreption);
          document.body.append(detail);
        };
        // infos
        let info = document.createElement("div");
        info.classList.add("info");
        let population = document.createElement("p");
        population.innerHTML = `Population: <span>${data[i].population}</span>`;
        let region = document.createElement("p");
        region.innerHTML = `Region: <span>${data[i].region}</span>`;
        let capital = document.createElement("p");
        capital.innerHTML = `Capital: <span>${data[i].capital}</span>`;
        info.append(population, region, capital);

        // finaly
        reg.append(regimg, regname, info);
        container.append(reg);
        reg.type = `${data[i].region}`;
        reg.name = `${data[i].name.toLowerCase()}`;
      }
    }
    type();
  });

let searchBox = document.querySelector(".search");
let search = document.querySelector(".search input");

searchBox.onclick = function () {
  search.focus();
};

let d = {
  gg: 12,
  dd: 12,
  hh: 12,
};
let theme = document.querySelector(".theme");
let thnow = "light";
let root = document.querySelector(":root");
theme.onclick = function () {
  if (thnow === "light") {
    theme.innerHTML = `<i class="fa-regular fa-moon"></i>
        <h4>Light Mode</h4>`;
    thnow = "dark";
    root.style.setProperty("--themebg", "hsl(207, 26%, 17%)");
    root.style.setProperty("--themetx", "hsl(0, 0%, 100%)");
    root.style.setProperty("--themeinp", "hsl(0, 0%, 100%)");
    root.style.setProperty("--themeel", "hsl(209, 23%, 22%)");
  } else {
    theme.innerHTML = `<i class="fa-regular fa-moon"></i>
        <h4>Dark Mode</h4>`;
    root.style.setProperty("--themebg", "hsl(0, 0%, 98%)");
    root.style.setProperty("--themetx", "hsl(hsl(200, 15%, 8%))");
    root.style.setProperty("--themeinp", "hsl(0, 0%, 52%)");
    root.style.setProperty("--themeel", "hsl(0, 0%, 100%)");
    thnow = "light";
  }
};

let filter = document.querySelector(".filter");
let list = document.querySelector(".list");

filter.onclick = function () {
  list.classList.toggle("active");
};

let regions = document.querySelectorAll(".list div");
regions.forEach((el) => {
  el.onclick = function () {
    if (el.classList[0] !== "none") {
      for (let i = 0; i < container.children.length; i++) {
        if (container.children[i].type !== el.classList[0]) {
          container.children[i].style.display = "none";
        } else {
          container.children[i].style.display = "flex";
        }
      }
    } else {
      for (let i = 0; i < container.children.length; i++) {
        container.children[i].style.display = "flex";
      }
    }
  };
});

search.oninput = function () {
  for (let i = 0; i < container.children.length; i++) {
    if (!container.children[i].name.includes(search.value.toLowerCase())) {
      container.children[i].style.display = "none";
    } else {
      container.children[i].style.display = "flex";
    }
  }
};
