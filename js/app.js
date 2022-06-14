(() => {
    "use strict";
    function isWebp() {
        function testWebP(callback) {
            let webP = new Image;
            webP.onload = webP.onerror = function() {
                callback(2 == webP.height);
            };
            webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        }
        testWebP((function(support) {
            let className = true === support ? "webp" : "no-webp";
            document.documentElement.classList.add(className);
        }));
    }
    function addLoadedClass() {
        window.addEventListener("load", (function() {
            if (document.querySelector("body")) setTimeout((function() {
                document.querySelector("body").classList.add("_loaded");
            }), 200);
        }));
    }
    let addWindowScrollEvent = false;
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    if (sessionStorage.getItem("preloader")) {
        if (document.querySelector(".preloader")) document.querySelector(".preloader").classList.add("_hide");
        document.querySelector(".wrapper").classList.add("_visible");
    }
    if (sessionStorage.getItem("money")) {
        if (document.querySelector(".check")) document.querySelectorAll(".check").forEach((el => {
            el.textContent = sessionStorage.getItem("money");
        }));
    } else {
        sessionStorage.setItem("money", 1e3);
        if (document.querySelector(".check")) document.querySelectorAll(".check").forEach((el => {
            el.textContent = sessionStorage.getItem("money");
        }));
    }
    if (document.querySelector(".main")) if (!sessionStorage.getItem("current-level")) {
        sessionStorage.setItem("current-level", 1);
        document.querySelector(".levels__middle p").textContent = sessionStorage.getItem("current-level");
    } else document.querySelector(".levels__middle p").textContent = sessionStorage.getItem("current-level");
    const preloader = document.querySelector(".preloader");
    const wrapper = document.querySelector(".wrapper");
    const window_height = document.documentElement.clientHeight;
    function remove_class(block, className) {
        document.querySelectorAll(block).forEach((el => {
            if (el.classList.contains(className)) el.classList.remove(className);
        }));
    }
    function delete_money(count, block) {
        let money = +sessionStorage.getItem("money");
        sessionStorage.setItem("money", money - count);
        setTimeout((() => {
            document.querySelectorAll(block).forEach((el => el.classList.add("_delete-money")));
            document.querySelectorAll(block).forEach((el => el.textContent = sessionStorage.getItem("money")));
        }), 500);
        setTimeout((() => {
            document.querySelectorAll(block).forEach((el => el.classList.remove("_delete-money")));
        }), 1500);
    }
    function no_money(block) {
        document.querySelectorAll(block).forEach((el => el.classList.add("_no-money")));
        setTimeout((() => {
            document.querySelectorAll(block).forEach((el => el.classList.remove("_no-money")));
        }), 1e3);
    }
    function get_random(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }
    function get_random_num_arr(mn, mx) {
        function get_rand(mn, mx) {
            return Math.floor(Math.random() * (mx - mn) + mn);
        }
        let arr = [];
        let count = 0;
        return function back() {
            if (2 == count) return arr;
            if (0 == arr.length) {
                let num1 = get_rand(mn, mx);
                arr.push(num1);
                count++;
            }
            if (arr.length == count) {
                let num = get_rand(mn, mx);
                if (true == arr.includes(num)) return back(mn, mx);
                arr.push(num);
                count++;
                return back(mn, mx);
            }
        };
    }
    let anim_items = document.querySelectorAll(".icon-anim img");
    function get_random_animate() {
        let number = get_random(0, 3);
        let arr = [ "jump", "scale", "rotate" ];
        let random_item = get_random(0, anim_items.length);
        anim_items.forEach((el => {
            if (el.classList.contains("_anim-icon-jump")) el.classList.remove("_anim-icon-jump"); else if (el.classList.contains("_anim-icon-scale")) el.classList.remove("_anim-icon-scale"); else if (el.classList.contains("_anim-icon-rotate")) el.classList.remove("_anim-icon-rotate");
        }));
        setTimeout((() => {
            anim_items[random_item].classList.add(`_anim-icon-${arr[number]}`);
        }), 100);
    }
    if (document.querySelector(".icon-anim img")) setInterval((() => {
        get_random_animate();
    }), 1e4);
    function add_number_storrage(name, number) {
        let arr = get_arr_storrage(name);
        arr.push(number);
        save_arr_storrage(arr, name);
    }
    function save_arr_storrage(arr, name) {
        sessionStorage.setItem(name, JSON.stringify(arr));
    }
    function get_arr_storrage(name) {
        console.log(name);
        console.log(sessionStorage.getItem(name));
        let arr = JSON.parse(sessionStorage.getItem(name));
        let numbers = arr;
        numbers.sort((function(a, b) {
            return a - b;
        }));
        return numbers;
    }
    if (document.querySelector(".main")) {
        if (!sessionStorage.getItem("heroes")) {
            let arr_heroes = [];
            save_arr_storrage(arr_heroes, "heroes");
        }
        if (!sessionStorage.getItem("weapons")) {
            let arr_weapons = [ 1 ];
            save_arr_storrage(arr_weapons, "weapons");
        }
        if (!sessionStorage.getItem("opened-heroes")) {
            let arr_opened_heroes = [];
            save_arr_storrage(arr_opened_heroes, "opened-heroes");
        }
        write_random_enemy();
        check_active_heroes_main_screen();
    }
    function write_random_enemy() {
        let random_arr = get_random_num_arr(1, 9);
        let new_rand_arr = random_arr();
        document.querySelector(".actions-main__image_1 img").setAttribute("src", `img/enemys/enemy-${new_rand_arr[0]}.png`);
        document.querySelector(".actions-main__image_2 img").setAttribute("src", `img/enemys/enemy-${new_rand_arr[1]}.png`);
    }
    function check_active_heroes_main_screen() {
        if (sessionStorage.getItem("current-hero-1") && sessionStorage.getItem("current-hero-2")) {
            document.querySelector(".board-main__man_1 img").setAttribute("src", `img/heroes/hero-${+sessionStorage.getItem("current-hero-1")}.png`);
            document.querySelector(".board-main__man_2 img").setAttribute("src", `img/heroes/hero-${+sessionStorage.getItem("current-hero-2")}.png`);
            document.querySelector(".board-main__sword_1 img").setAttribute("src", `img/weapons/sword-${+sessionStorage.getItem("current-weapon-1")}.png`);
            document.querySelector(".board-main__sword_2 img").setAttribute("src", `img/weapons/sword-${+sessionStorage.getItem("current-weapon-2")}.png`);
        } else if (sessionStorage.getItem("current-hero-1") && !sessionStorage.getItem("current-hero-2")) {
            document.querySelector(".board-main__man_1 img").setAttribute("src", `img/heroes/hero-${+sessionStorage.getItem("current-hero-1")}.png`);
            document.querySelector(".board-main__sword_1 img").setAttribute("src", `img/weapons/sword-${+sessionStorage.getItem("current-weapon-1")}.png`);
        } else if (!sessionStorage.getItem("current-hero-1") && sessionStorage.getItem("current-hero-2")) {
            document.querySelector(".board-main__man_2 img").setAttribute("src", `img/heroes/hero-${+sessionStorage.getItem("current-hero-2")}.png`);
            document.querySelector(".board-main__sword_2 img").setAttribute("src", `img/weapons/sword-${+sessionStorage.getItem("current-weapon-2")}.png`);
        }
    }
    if (document.querySelector(".wrapper__team") && sessionStorage.getItem("preloader")) {
        if (window_height > 600) document.querySelector(".content-item__bg img").setAttribute("src", "img/other/board-big.png");
        open_active_heroes();
        open_weapons_active_heroes();
        check_write_weapons();
        check_position_weapons_when_open_page();
        check_active_heroes_when_open_page();
        check_select_all_heroes();
    } else if (document.querySelector(".wrapper__team") && !sessionStorage.getItem("preloader")) location.href = "index.html";
    function delete_item_locked_weapon(weapon) {
        document.querySelectorAll(".heroe-team__weapon-locked").forEach((el => {
            if (el.closest(weapon) && !el.closest(".heroe-team").classList.contains("_locked")) el.remove();
        }));
    }
    function create_weapon_box(weapon) {
        let box_weapon = document.createElement("div");
        box_weapon.classList.add("heroe-team__box-weapon");
        let board = document.createElement("div");
        board.classList.add("heroe-team__board");
        let board_image = document.createElement("img");
        board_image.setAttribute("src", "img/icons/box-weapon.png");
        board.append(board_image);
        let sword = document.createElement("div");
        sword.classList.add("heroe-team__sword");
        let sword_image = document.createElement("img");
        sword_image.setAttribute("src", `img/weapons/sword-${weapon}.png`);
        sword.append(sword_image);
        let item = document.createElement("div");
        item.classList.add("heroe-team__button-box");
        let button = document.createElement("button");
        button.setAttribute("type", "button");
        button.classList.add("heroe-team__button");
        let wing_left = document.createElement("div");
        wing_left.classList.add("heroe-team__button-wing-left");
        let wing_left_image = document.createElement("img");
        wing_left_image.setAttribute("src", "img/icons/btn-left.png");
        wing_left.append(wing_left_image);
        let main_item = document.createElement("div");
        main_item.classList.add("heroe-team__button-middle");
        let main_item_image = document.createElement("img");
        main_item_image.setAttribute("src", "img/icons/btn-middle.png");
        main_item.append(main_item_image);
        let wing_right = document.createElement("div");
        wing_right.classList.add("heroe-team__button-wing-right");
        let wing_right_image = document.createElement("img");
        wing_right_image.setAttribute("src", "img/icons/btn-right.png");
        wing_right.append(wing_right_image);
        let text = document.createElement("p");
        text.textContent = "Select";
        button.append(wing_left, main_item, wing_right, text);
        item.append(button);
        box_weapon.append(board, sword, item);
        return box_weapon;
    }
    function open_weapons_active_heroes() {
        let heroes = get_arr_storrage("heroes");
        heroes.forEach((el => {
            document.querySelectorAll(".content-item__heroe")[el - 1].classList.add("_opened");
        }));
    }
    function check_write_weapons() {
        let numbers = get_arr_storrage("weapons");
        if (numbers.length < 5) for (let i = 0; i < numbers.length; i++) {
            delete_item_locked_weapon(`.heroe-team__weapon_${i + 1}`);
            check_opened_heroe_open_weapon(`.heroe-team__weapon_${i + 1}`, numbers[i]);
            document.querySelectorAll(`.heroe-team__weapon_${i + 1}`).forEach((el => el.dataset.active = numbers[i]));
        } else {
            for (let i = 0; i < 4; i++) {
                delete_item_locked_weapon(`.heroe-team__weapon_${i + 1}`);
                check_opened_heroe_open_weapon(`.heroe-team__weapon_${i + 1}`, numbers[i]);
                document.querySelectorAll(`.heroe-team__weapon_${i + 1}`).forEach((el => el.dataset.active = numbers[i]));
            }
            document.querySelectorAll(".heroe-team__weapons").forEach((el => {
                if (!el.closest(".heroe-team").classList.contains("_locked")) el.classList.add("_opened");
            }));
        }
    }
    function check_opened_heroe_open_weapon(weapon, num) {
        document.querySelectorAll(weapon).forEach((el => {
            if (!el.closest(".heroe-team").classList.contains("_locked")) {
                let item = create_weapon_box(num);
                el.setAttribute("data-active", num);
                el.append(item);
            }
        }));
    }
    function create_character(hero_num) {
        let character = document.createElement("div");
        character.classList.add("heroe-team__character");
        let box_hero = document.createElement("div");
        box_hero.classList.add("heroe-team__box-hero");
        let box_hero_image = document.createElement("img");
        box_hero_image.setAttribute("src", "img/icons/card-hero.png");
        box_hero.append(box_hero_image);
        let hero = document.createElement("div");
        hero.classList.add("heroe-team__hero");
        let hero_image = document.createElement("img");
        hero_image.setAttribute("src", `img/heroes/hero-${hero_num}.png`);
        hero.append(hero_image);
        character.append(box_hero, hero);
        return character;
    }
    function remove_team_locked_character_box(character) {
        document.querySelectorAll(".heroe-team__box-locked").forEach((el => {
            if (el.closest(character)) el.remove();
        }));
    }
    function open_active_heroes() {
        check_opened_heroe();
    }
    function check_opened_heroe() {
        let heroes = get_arr_storrage("heroes");
        heroes.forEach((el => {
            remove_team_locked_character_box(`.heroe-team__character_${el}`);
            let character = create_character(el);
            document.querySelector(`.heroe-team__character_${el}`).append(character);
            document.querySelectorAll(".heroe-team")[el - 1].classList.remove("_locked");
        }));
    }
    function remove_class_item(block, num, className) {
        document.querySelectorAll(block).forEach((el => {
            if (el.classList.contains(className) && el.closest(".content-item__heroe").dataset.hero == num) el.classList.remove(className);
        }));
    }
    function change_weapon(number_hero, box, block) {
        let numbers = JSON.parse(sessionStorage.getItem("weapons"));
        let opened_weapons = [];
        let not_active_weapons = [];
        let click_number = box.dataset.active;
        let del_num = 0;
        if (numbers.length > 4) {
            let arr = document.querySelectorAll(".heroe-team__weapon");
            arr.forEach((el => {
                if (el.closest(".content-item__heroe").dataset.hero == number_hero) opened_weapons.push(+el.dataset.active);
            }));
            if (sessionStorage.getItem("not-active-weapons")) not_active_weapons = JSON.parse(sessionStorage.getItem("not-active-weapons")); else numbers.forEach((el => {
                let index = opened_weapons.findIndex((item => {
                    if (item == el) return item;
                }));
                if (-1 == index) not_active_weapons.push(el);
            }));
            del_num = not_active_weapons.shift();
            not_active_weapons.push(+click_number);
            save_arr_storrage(not_active_weapons, "not-active-weapons");
            block.querySelector("img").setAttribute("src", `img/weapons/sword-${del_num}.png`);
            box.dataset.active = del_num;
        }
    }
    function get_active_weapon(targetElement) {
        let heroe = targetElement.closest(".content-item__heroe").dataset.hero;
        let weapon = 0;
        document.querySelectorAll(".heroe-team__weapon").forEach((el => {
            if (el.closest(".content-item__heroe").dataset.hero == heroe && el.classList.contains("_selected")) weapon = el.dataset.active;
        }));
        if (!sessionStorage.getItem("current-hero-1")) {
            sessionStorage.setItem("current-hero-1", heroe);
            sessionStorage.setItem("current-weapon-1", weapon);
        } else if (sessionStorage.getItem("current-hero-1") && !sessionStorage.getItem("current-hero-2")) {
            sessionStorage.setItem("current-hero-2", heroe);
            sessionStorage.setItem("current-weapon-2", weapon);
        } else if (!sessionStorage.getItem("current-hero-1") && sessionStorage.getItem("current-hero-2")) {
            sessionStorage.setItem("current-hero-1", heroe);
            sessionStorage.setItem("current-weapon-1", weapon);
        }
    }
    function check_select_all_heroes() {
        if (sessionStorage.getItem("current-hero-1") && sessionStorage.getItem("current-hero-2")) document.querySelectorAll(".heroe-team").forEach((el => {
            if (!el.classList.contains("_active") && !el.classList.contains("_locked")) el.classList.add("_hold");
        })); else document.querySelectorAll(".heroe-team").forEach((el => {
            if (el.classList.contains("_hold")) el.classList.remove("_hold");
        }));
    }
    function check_active_heroes_when_open_page() {
        let hero_1 = 0;
        let hero_2 = 0;
        let weapon_1 = 0;
        let weapon_2 = 0;
        if (sessionStorage.getItem("current-hero-1")) hero_1 = +sessionStorage.getItem("current-hero-1");
        if (sessionStorage.getItem("current-hero-2")) hero_2 = +sessionStorage.getItem("current-hero-2");
        if (sessionStorage.getItem("current-weapon-1")) weapon_1 = +sessionStorage.getItem("current-weapon-1");
        if (sessionStorage.getItem("current-weapon-2")) weapon_2 = +sessionStorage.getItem("current-weapon-2");
        document.querySelectorAll(".heroe-team").forEach((el => {
            if (el.dataset.hero == hero_1) el.classList.add("_active");
            if (el.dataset.hero == hero_2) el.classList.add("_active");
        }));
        document.querySelectorAll(".heroe-team__button-box").forEach((el => {
            if (el.closest(".heroe-team").dataset.hero == hero_1 && el.closest(".heroe-team__weapon").dataset.active == weapon_1) {
                el.closest(".heroe-team__weapons").classList.add("_hold");
                el.classList.add("_selected");
                el.closest(".heroe-team__weapon").classList.add("_selected");
                el.closest(".heroe-team__weapons").classList.add("_selected");
            }
            if (el.closest(".heroe-team").dataset.hero == hero_2 && el.closest(".heroe-team__weapon").dataset.active == weapon_2) {
                el.closest(".heroe-team__weapons").classList.add("_hold");
                el.classList.add("_selected");
                el.closest(".heroe-team__weapon").classList.add("_selected");
                el.closest(".heroe-team__weapons").classList.add("_selected");
            }
        }));
    }
    function save_position_weapons_when_exit() {
        document.querySelectorAll(".heroe-team").forEach((el => {
            if (!el.classList.contains("_locked")) {
                let arr = [];
                document.querySelectorAll(".heroe-team__weapon").forEach((item => {
                    if (item.closest(".heroe-team").dataset.hero == el.dataset.hero) arr.push(+item.dataset.active);
                }));
                save_arr_storrage(arr, `weapon-${el.dataset.hero}`);
            }
        }));
    }
    function check_position_weapons_when_open_page() {
        if (sessionStorage.getItem("weapon-1") || sessionStorage.getItem("weapon-2") || sessionStorage.getItem("weapon-3") || sessionStorage.getItem("weapon-4") || sessionStorage.getItem("weapon-5") || sessionStorage.getItem("weapon-6") || sessionStorage.getItem("weapon-7") || sessionStorage.getItem("weapon-8") || sessionStorage.getItem("weapon-9") || sessionStorage.getItem("weapon-10") || sessionStorage.getItem("weapon-11") || sessionStorage.getItem("weapon-12")) document.querySelectorAll(".heroe-team").forEach((el => {
            if (!el.classList.contains("_locked")) {
                let arr = [];
                let arr_2 = [];
                document.querySelectorAll(".heroe-team__sword").forEach((item => {
                    if (item.closest(".heroe-team").dataset.hero == el.dataset.hero) {
                        arr = get_arr_storrage(`weapon-${el.dataset.hero}`);
                        arr_2.push(item);
                    }
                }));
                arr_2.forEach(((item, i) => {
                    item.querySelector("img").setAttribute("src", `img/weapons/sword-${arr[i]}.png`);
                    item.closest(".heroe-team__weapon").dataset.active = arr[i];
                }));
            }
        }));
    }
    const price_hero = {
        hero_2: 3e3,
        hero_3: 5e3,
        hero_4: 8e3,
        hero_5: 11e3,
        hero_6: 14e3,
        hero_7: 17e3,
        hero_8: 2e4
    };
    const price_weapons = {
        weapon_2: 1e3,
        weapon_3: 2e3,
        weapon_4: 3e3,
        weapon_5: 4e3,
        weapon_6: 5e3,
        weapon_7: 6e3,
        weapon_8: 7e3,
        weapon_9: 8e3,
        weapon_10: 9e3,
        weapon_11: 1e4,
        weapon_12: 11e3
    };
    if (document.querySelector(".shop") && sessionStorage.getItem("preloader")) {
        if (window_height > 600) document.querySelector(".content-item__bg img").setAttribute("src", "img/other/board-big.png");
        write_prices_heroes();
        write_prices_wewapons();
        check_opened_heroes();
        check_bought_heroes();
        check_bought_weapons();
    } else if (document.querySelector(".shop") && !sessionStorage.getItem("preloader")) location.href = "index.html";
    function write_prices_heroes() {
        document.querySelectorAll(".item-heroes__button-price")[0].textContent = price_hero.hero_2;
        document.querySelectorAll(".item-heroes__button-price")[1].textContent = price_hero.hero_3;
        document.querySelectorAll(".item-heroes__button-price")[2].textContent = price_hero.hero_4;
        document.querySelectorAll(".item-heroes__button-price")[3].textContent = price_hero.hero_5;
        document.querySelectorAll(".item-heroes__button-price")[4].textContent = price_hero.hero_6;
        document.querySelectorAll(".item-heroes__button-price")[5].textContent = price_hero.hero_7;
        document.querySelectorAll(".item-heroes__button-price")[6].textContent = price_hero.hero_8;
    }
    function write_prices_wewapons() {
        document.querySelectorAll(".item-weapons__button-price")[0].textContent = price_weapons.weapon_2;
        document.querySelectorAll(".item-weapons__button-price")[1].textContent = price_weapons.weapon_3;
        document.querySelectorAll(".item-weapons__button-price")[2].textContent = price_weapons.weapon_4;
        document.querySelectorAll(".item-weapons__button-price")[3].textContent = price_weapons.weapon_5;
        document.querySelectorAll(".item-weapons__button-price")[4].textContent = price_weapons.weapon_6;
        document.querySelectorAll(".item-weapons__button-price")[5].textContent = price_weapons.weapon_7;
        document.querySelectorAll(".item-weapons__button-price")[6].textContent = price_weapons.weapon_8;
        document.querySelectorAll(".item-weapons__button-price")[7].textContent = price_weapons.weapon_9;
        document.querySelectorAll(".item-weapons__button-price")[8].textContent = price_weapons.weapon_10;
        document.querySelectorAll(".item-weapons__button-price")[9].textContent = price_weapons.weapon_11;
        document.querySelectorAll(".item-weapons__button-price")[10].textContent = price_weapons.weapon_12;
    }
    function chek_buy_hero(number) {
        if (2 == number) if (+sessionStorage.getItem("money") >= price_hero.hero_2) {
            delete_money(price_hero.hero_2, ".check");
            add_number_storrage("heroes", 2);
        } else no_money(".check"); else if (3 == number) if (+sessionStorage.getItem("money") >= price_hero.hero_3) {
            delete_money(price_hero.hero_3, ".check");
            add_number_storrage("heroes", 3);
        } else no_money(".check"); else if (4 == number) if (+sessionStorage.getItem("money") >= price_hero.hero_4) {
            delete_money(price_hero.hero_4, ".check");
            add_number_storrage("heroes", 4);
        } else no_money(".check"); else if (5 == number) if (+sessionStorage.getItem("money") >= price_hero.hero_5) {
            delete_money(price_hero.hero_5, ".check");
            add_number_storrage("heroes", 5);
        } else no_money(".check"); else if (6 == number) if (+sessionStorage.getItem("money") >= price_hero.hero_6) {
            delete_money(price_hero.hero_6, ".check");
            add_number_storrage("heroes", 6);
        } else no_money(".check"); else if (7 == number) if (+sessionStorage.getItem("money") >= price_hero.hero_7) {
            delete_money(price_hero.hero_7, ".check");
            add_number_storrage("heroes", 7);
        } else no_money(".check"); else if (8 == number) if (+sessionStorage.getItem("money") >= price_hero.hero_8) {
            delete_money(price_hero.hero_8, ".check");
            add_number_storrage("heroes", 8);
        } else no_money(".check");
        check_bought_heroes();
    }
    function chek_buy_weapon(number) {
        if (2 == number) if (+sessionStorage.getItem("money") >= price_weapons.weapon_2) {
            delete_money(price_weapons.weapon_2, ".check");
            add_number_storrage("weapons", 2);
        } else no_money(".check"); else if (3 == number) if (+sessionStorage.getItem("money") >= price_weapons.weapon_3) {
            delete_money(price_weapons.weapon_3, ".check");
            add_number_storrage("weapons", 3);
        } else no_money(".check"); else if (4 == number) if (+sessionStorage.getItem("money") >= price_weapons.weapon_4) {
            delete_money(price_weapons.weapon_4, ".check");
            add_number_storrage("weapons", 4);
        } else no_money(".check"); else if (5 == number) if (+sessionStorage.getItem("money") >= price_weapons.weapon_5) {
            delete_money(price_weapons.weapon_5, ".check");
            add_number_storrage("weapons", 5);
        } else no_money(".check"); else if (6 == number) if (+sessionStorage.getItem("money") >= price_weapons.weapon_6) {
            delete_money(price_weapons.weapon_6, ".check");
            add_number_storrage("weapons", 6);
        } else no_money(".check"); else if (7 == number) if (+sessionStorage.getItem("money") >= price_weapons.weapon_7) {
            delete_money(price_weapons.weapon_7, ".check");
            add_number_storrage("weapons", 7);
        } else no_money(".check"); else if (8 == number) if (+sessionStorage.getItem("money") >= price_weapons.weapon_8) {
            delete_money(price_weapons.weapon_8, ".check");
            add_number_storrage("weapons", 8);
        } else no_money(".check"); else if (9 == number) if (+sessionStorage.getItem("money") >= price_weapons.weapon_9) {
            delete_money(price_weapons.weapon_9, ".check");
            add_number_storrage("weapons", 9);
        } else no_money(".check"); else if (10 == number) if (+sessionStorage.getItem("money") >= price_weapons.weapon_10) {
            delete_money(price_weapons.weapon_10, ".check");
            add_number_storrage("weapons", 10);
        } else no_money(".check"); else if (11 == number) if (+sessionStorage.getItem("money") >= price_weapons.weapon_11) {
            delete_money(price_weapons.weapon_11, ".check");
            add_number_storrage("weapons", 11);
        } else no_money(".check"); else if (12 == number) if (+sessionStorage.getItem("money") >= price_weapons.weapon_12) {
            delete_money(price_weapons.weapon_12, ".check");
            add_number_storrage("weapons", 12);
        } else no_money(".check");
        check_bought_weapons();
    }
    function check_bought_heroes() {
        let heroes = get_arr_storrage("heroes");
        heroes.forEach((el => {
            document.querySelectorAll(".item-heroes__button-box")[el - 2].classList.add("_hide");
        }));
    }
    function check_bought_weapons() {
        let weapons = get_arr_storrage("weapons");
        weapons.forEach((el => {
            if (el > 1) document.querySelectorAll(".item-weapons__button-box")[el - 2].classList.add("_hide");
        }));
    }
    function check_opened_heroes() {
        let opened_heroes = get_arr_storrage("opened-heroes");
        opened_heroes.forEach((el => {
            document.querySelectorAll(".item-heroes__block")[el - 2].classList.add("_active");
        }));
    }
    const config_game = {
        level: +sessionStorage.getItem("current-level"),
        goal: 1,
        timer_hero_1: false,
        timer_hero_2: false
    };
    if (document.querySelector(".game") && sessionStorage.getItem("preloader")) {
        document.querySelector(".info-game__level p").textContent = `Level ${config_game.level}`;
        select_write_enemys();
        select_write_heroes();
    } else if (document.querySelector(".game") && !sessionStorage.getItem("preloader")) location.href = "index.html";
    function select_write_enemys() {
        if (1 == config_game.level) {
            document.querySelector(".field__image_1 img").setAttribute("src", "img/enemys/enemy-1.png");
            document.querySelector(".field__image_2 img").setAttribute("src", "img/enemys/enemy-2.png");
        } else if (2 == config_game.level) {
            document.querySelector(".field__image_1 img").setAttribute("src", "img/enemys/enemy-3.png");
            document.querySelector(".field__image_2 img").setAttribute("src", "img/enemys/enemy-4.png");
        } else if (3 == config_game.level) {
            document.querySelector(".field__image_1 img").setAttribute("src", "img/enemys/enemy-5.png");
            document.querySelector(".field__image_2 img").setAttribute("src", "img/enemys/enemy-6.png");
        } else if (4 == config_game.level) {
            document.querySelector(".field__image_1 img").setAttribute("src", "img/enemys/enemy-7.png");
            document.querySelector(".field__image_2 img").setAttribute("src", "img/enemys/enemy-8.png");
        }
    }
    function select_write_heroes() {
        if (sessionStorage.getItem("current-hero-1") && sessionStorage.getItem("current-hero-2")) {
            document.querySelector(".field__man_1 img").setAttribute("src", `img/heroes/hero-${sessionStorage.getItem("current-hero-1")}.png`);
            document.querySelector(".field__man_2 img").setAttribute("src", `img/heroes/hero-${sessionStorage.getItem("current-hero-2")}.png`);
            document.querySelector(".field__sword_1 img").setAttribute("src", `img/weapons/sword-${sessionStorage.getItem("current-weapon-1")}.png`);
            document.querySelector(".field__sword_2 img").setAttribute("src", `img/weapons/sword-${sessionStorage.getItem("current-weapon-2")}.png`);
        } else if (sessionStorage.getItem("current-hero-1") && !sessionStorage.getItem("current-hero-2")) {
            document.querySelector(".field__man_1 img").setAttribute("src", `img/heroes/hero-${sessionStorage.getItem("current-hero-1")}.png`);
            document.querySelector(".field__sword_1 img").setAttribute("src", `img/weapons/sword-${sessionStorage.getItem("current-weapon-1")}.png`);
        } else if (!sessionStorage.getItem("current-hero-1") && sessionStorage.getItem("current-hero-2")) {
            document.querySelector(".field__man_2 img").setAttribute("src", `img/heroes/hero-${sessionStorage.getItem("current-hero-2")}.png`);
            document.querySelector(".field__sword_2 img").setAttribute("src", `img/weapons/sword-${sessionStorage.getItem("current-weapon-2")}.png`);
        }
    }
    function start_game() {
        config_game.goal = select_first_goal();
        setTimeout((() => {
            moove_enemy(".field__evil_1", 1);
        }), 1e3);
        setTimeout((() => {
            moove_enemy(".field__evil_2", 2);
        }), 1500);
    }
    function select_first_goal() {
        return get_random(1, 3);
    }
    function moove_enemy(item, num) {
        let arr_1 = [ 1, 3, 5 ];
        let arr_2 = [ 2, 4, 6 ];
        let num_1 = get_random(0, 3);
        let num_2 = get_random(0, 3);
        if (1 == num) {
            document.querySelector(item).classList.add(`_enemy-${arr_1[num_1]}`);
            setTimeout((() => {
                document.querySelector(item).classList.remove(`_enemy-${arr_1[num_1]}`);
            }), 2500);
        } else if (2 == num) {
            document.querySelector(item).classList.add(`_enemy-${arr_2[num_2]}`);
            setTimeout((() => {
                document.querySelector(item).classList.remove(`_enemy-${arr_2[num_2]}`);
            }), 2500);
        }
    }
    document.addEventListener("click", (e => {
        let targetElement = e.target;
        let current_level = +sessionStorage.getItem("current-level");
        sessionStorage.getItem("money");
        if (targetElement.closest(".preloader__button")) {
            sessionStorage.setItem("preloader", true);
            preloader.classList.add("_hide");
            wrapper.classList.add("_visible");
            if (document.querySelector(".main") && document.querySelector(".preloader").classList.contains("_hide")) document.querySelector(".main").classList.add("_active");
        }
        if (targetElement.closest(".levels__arrow_left")) if (current_level > 1) {
            sessionStorage.setItem("current-level", current_level - 1);
            document.querySelector(".levels__middle p").textContent = sessionStorage.getItem("current-level");
        }
        if (targetElement.closest(".levels__arrow_right")) if (current_level < 4) {
            sessionStorage.setItem("current-level", current_level + 1);
            document.querySelector(".levels__middle p").textContent = sessionStorage.getItem("current-level");
        }
        if (targetElement.closest(".heroe-team__button")) {
            remove_class_item(".heroe-team__button-box", targetElement.closest(".content-item__heroe").dataset.hero, "_selected");
            remove_class_item(".heroe-team__weapon", targetElement.closest(".content-item__heroe").dataset.hero, "_selected");
            remove_class_item(".heroe-team__weapons", targetElement.closest(".content-item__heroe").dataset.hero, "_selected");
            targetElement.closest(".heroe-team__button-box").classList.add("_selected");
            targetElement.closest(".heroe-team__weapon").classList.add("_selected");
            targetElement.closest(".heroe-team__weapons").classList.add("_selected");
        }
        if (targetElement.closest(".heroe-team__sword")) change_weapon(targetElement.closest(".content-item__heroe").dataset.hero, targetElement.closest(".heroe-team__weapon"), targetElement.closest(".heroe-team__sword"));
        if (targetElement.closest(".heroe-team__character") && !targetElement.closest(".content-item__heroe").classList.contains("_locked")) {
            let heroe = targetElement.closest(".content-item__heroe").dataset.hero;
            let number_item = targetElement.closest(".content-item__heroe").dataset.hero;
            let weapons = document.querySelectorAll(".heroe-team__weapons");
            weapons.forEach((el => {
                if (!el.classList.contains("_selected") && el.closest(".content-item__heroe").dataset.hero == number_item) {
                    el.closest(".content-item__heroe").classList.add("_anim");
                    setTimeout((() => {
                        el.closest(".content-item__heroe").classList.remove("_anim");
                    }), 1e3);
                } else if (el.classList.contains("_selected") && el.closest(".content-item__heroe").dataset.hero == number_item) {
                    el.classList.remove("_hold");
                    if (targetElement.closest(".content-item__heroe").classList.contains("_active")) {
                        targetElement.closest(".content-item__heroe").classList.remove("_active");
                        if (+sessionStorage.getItem("current-hero-1") == heroe) {
                            sessionStorage.removeItem("current-hero-1");
                            sessionStorage.removeItem("current-weapon-1");
                        } else if (+sessionStorage.getItem("current-hero-2") == heroe) {
                            sessionStorage.removeItem("current-hero-2");
                            sessionStorage.removeItem("current-weapon-2");
                        }
                    } else {
                        el.classList.add("_hold");
                        if (!sessionStorage.getItem("current-hero-1") && !sessionStorage.getItem("current-hero-2")) {
                            targetElement.closest(".content-item__heroe").classList.add("_active");
                            get_active_weapon(targetElement.closest(".content-item__heroe"));
                        } else if (sessionStorage.getItem("current-hero-1") && !sessionStorage.getItem("current-hero-2")) {
                            targetElement.closest(".content-item__heroe").classList.add("_active");
                            get_active_weapon(targetElement.closest(".content-item__heroe"));
                        } else if (!sessionStorage.getItem("current-hero-1") && sessionStorage.getItem("current-hero-2")) {
                            targetElement.closest(".content-item__heroe").classList.add("_active");
                            get_active_weapon(targetElement.closest(".content-item__heroe"));
                        }
                    }
                }
            }));
            check_select_all_heroes();
        }
        if (targetElement.closest(".store__button_heroes")) {
            remove_class(".store__button", "_active");
            document.querySelector(".item-heroes").classList.remove("_hide");
            document.querySelector(".item-weapons").classList.add("_hide");
            document.querySelector(".store__button_heroes").classList.add("_active");
        }
        if (targetElement.closest(".store__button_weapons")) {
            remove_class(".store__button", "_active");
            document.querySelector(".item-heroes").classList.add("_hide");
            document.querySelector(".item-weapons").classList.remove("_hide");
            document.querySelector(".store__button_weapons").classList.add("_active");
        }
        if (targetElement.closest(".item-heroes__button-box")) {
            let item = +targetElement.closest(".item-heroes__block").dataset.character;
            chek_buy_hero(item);
        }
        if (targetElement.closest(".item-weapons__button-box")) {
            let item = +targetElement.closest(".item-weapons__block").dataset.weapon;
            chek_buy_weapon(item);
        }
        if (targetElement.closest(".header__button-box") && document.querySelector(".team") && sessionStorage.getItem("not-active-weapons")) {
            sessionStorage.removeItem("not-active-weapons");
            save_position_weapons_when_exit();
        }
        if (targetElement.closest(".game__button-start")) {
            document.querySelector(".game__button-start-box").classList.add("_start");
            document.querySelector(".game__button-start").classList.remove("_anim");
            start_game();
        }
    }));
    window["FLS"] = true;
    isWebp();
    addLoadedClass();
})();