<template>
      <ul class="catalog__pagination pagination">
        <li class="pagination__item">
          <a class="pagination__link pagination__link--arrow pagination__link--disabled"
             aria-label="Предыдущая страница">
            <svg width="8" height="14" fill="currentColor">
              <use xlink:href="#icon-arrow-left"></use>
            </svg>
          </a>
        </li>

        <li class="pagination__item" v-for="item in countPages" :key="item">
          <a href="#" class="pagination__link"
             :class="{'pagination__link--current' : page == item}">
            {{ item }}
          </a>
        </li>

        <li class="pagination__item">
          <a class="pagination__link pagination__link--arrow"
             href="#" aria-label="Следующая страница">
            <svg width="8" height="14" fill="currentColor">
              <use xlink:href="#icon-arrow-right"></use>
            </svg>
          </a>
        </li>
      </ul>
</template>

<script src="./index.js"></script>
