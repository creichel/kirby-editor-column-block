# Column Block for the Kirby 3 Editor

The plugin provides a multi-column layout to the Kirby Editor.

## Currently in development! Not finished for production use 😬
Help me and contribute to this repository so it comes faster to life

## References

- [Kirby 3](https://getkirby.com/)
- [Editor](https://github.com/getkirby/editor)

## Installation

Installation is currently only possible as file download or git submodule.
If anyone wants to help with setting up a composer package, I'm more than happy to accept a pull request.

**Note:** You can also use a different name for plugin directory, but [it needs to come after `editor` alphabetically](https://github.com/getkirby/editor/issues/238).

### Git Submodule

```
git submodule add https://github.com/creichel/kirby-editor-column-block.git site/plugins/kirby-editor-column-block
```

### Download

1. Download the [source archive](https://github.com/creichel/kirby-editor-column-block/archive/master.zip)
2. Unpack to `site/plugins/kriby-editor-column-block`

## Usage

### Template

In your templates you can use the normal Editor integration:

```php
<?= $page->text()->blocks() ?>
```

### Customization

As with any Editor blocks, you can provide a custom [snippet](https://getkirby.com/docs/guide/templates/snippets), so you can define how the file is rendered.

## License

This plugin is licensed under [MIT](LICENSE.md)
