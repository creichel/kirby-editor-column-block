editor.block("column", {

  // will appear as title in the blocks dropdown
  label: "Columns",

  // icon for the blocks dropdown
  icon: "menu",

  // get the content and attrs of the block as props
  props: {
    content: String,
    attrs: [Array, Object],
  },

  data() {
    return {
      columns: this.attrs.columns || [
        {
          id: this.uuid(),
          label: ""
        },
        {
          id: this.uuid(),
          label: ""
        }
      ],
      rows: this.attrs.rows || [
        ["", ""],
        ["", ""]
      ]
    };
  },

  watch: {
    columns: {
      handler() {
        if (this.columns.length === 0) {
          this.columns = [{
            id: this.uuid(),
            label: ""
          }];
        }
      },
      immediate: true
    }
  },

  // block methods
  methods: {
    appendColumn(after) {
      this.insertColumn(after + 1);
    },
    deleteColumn(index) {
      this.columns.splice(index, 1);
      this.rows.forEach(row => {
        this.$delete(row, index);
      });
    },
    insertColumn(index) {
      this.columns.splice(index, 0, {
        id: this.uuid(),
        label: ""
      });

      this.rows.forEach(row => {
        row.splice(index, 0, "");
      });
    },
    findCell(row, column) {
      const id = "cell-" + row + "-" + column;

      if (this.$refs[id]) {
        return this.$refs[id][0];
      }
    },
    focus() {
      // this.focusOnCell(0, 0);
    },
    focusOnCell(row, column) {
      const cell = this.findCell(row, column);

      if (cell) {
        cell.focus();
      }
    },
    focusOnPrevCell(row, column) {
      this.focusOnCell(row, column - 1);
    },
    focusOnNextCell(row, column) {
      this.focusOnCell(row, column + 1);
    },
    prependColumn(before) {
      this.insertColumn(before);
    },
    update() {
      this.$emit("input", {
        attrs: {
          columns: this.columns,
          rows: this.rows
        }
      });
    },
    updateColumn(html, column) {
      this.$set(this.columns[column], "label", html);
      this.update();
    },
    updateCell(html, row, cell) {
      this.$set(this.rows[row], cell, html);
      this.update();
    },
    uuid() {
      return '_' + Math.random().toString(36).substr(2, 9);
    }
  },
  template: `
    <div class="k-editor-column-block-container">
      <div v-for="(column, columnKey) in columns" :key="column.id" class="k-editor-column-block-column">
        <k-editable
          :content="column.label"
          :marks="[]"
          placeholder="New column …"
          @input="updateColumn($event, columnKey)"
          @next="focusOnCell(0, columnKey)"
        />
        <k-dropdown>
          <k-button class="k-editor-column-block-column-settings" icon="angle-down" @click="$refs['columnSettings-' + column.id][0].toggle()" />
          <k-dropdown-content :ref="'columnSettings-' + column.id" align="right">
            <k-dropdown-item icon="angle-left" @click="prependColumn(columnKey)">Insert left</k-dropdown-item>
            <k-dropdown-item icon="angle-right" @click="appendColumn(columnKey)">Insert right</k-dropdown-item>
            <hr>
            <k-dropdown-item icon="trash" @click="deleteColumn(columnKey)">Delete column</k-dropdown-item>
          </k-dropdown-content>
        </k-dropdown>
      </div>
    </div>
  `,
});

