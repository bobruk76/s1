<template>
      <ul class="catalog__pagination pagination">
        <li class="pagination__item">
          <a href="#" class="pagination__link pagination__link--arrow"
             :class="{'pagination__link--disabled' : page == 1}"
             aria-label="Предыдущая страница"
             @click.prevent="paginate(page-1)">
            <svg width="8" height="14" fill="currentColor">
              <use xlink:href="#icon-arrow-left"></use>
            </svg>
          </a>
        </li>

        <li class="pagination__item" v-for="item in countPages" :key="item">
          <a href="#" class="pagination__link"
             :class="{'pagination__link--current' : page == item}"
             @click.prevent="paginate(item)">
            {{ item }}
          </a>
        </li>

        <li class="pagination__item">
          <a href="#" class="pagination__link pagination__link--arrow"
             :class="{'pagination__link--disabled' : page == countPages}"
             @click.prevent="paginate(page+1)"
             aria-label="Следующая страница">
            <svg width="8" height="14" fill="currentColor">
              <use xlink:href="#icon-arrow-right"></use>
            </svg>
          </a>
        </li>
      </ul>
</template>

<script src="./index.js"></script>
