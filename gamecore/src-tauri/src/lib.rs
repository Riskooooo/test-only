use tauri::{
    menu::{MenuBuilder, MenuItemBuilder, PredefinedMenuItem},
    tray::TrayIconBuilder,
    Emitter, Manager,
};

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .setup(|app| {
            let icon = tauri::image::Image::from_bytes(include_bytes!("../icons/icon.png"))?;

            let projects  = MenuItemBuilder::new("Projects").id("projects").build(app)?;
            let tasks     = MenuItemBuilder::new("Tasks").id("tasks").build(app)?;
            let assets    = MenuItemBuilder::new("Assets").id("assets").build(app)?;
            let notes     = MenuItemBuilder::new("Notes").id("notes").build(app)?;
            let progress  = MenuItemBuilder::new("Progress").id("progress").build(app)?;
            let separator = PredefinedMenuItem::separator(app)?;
            let settings  = MenuItemBuilder::new("Settings").id("settings").build(app)?;
            let separator2 = PredefinedMenuItem::separator(app)?;
            let exit      = MenuItemBuilder::new("Exit").id("exit").build(app)?;

            let menu = MenuBuilder::new(app)
                .item(&projects)
                .item(&tasks)
                .item(&assets)
                .item(&notes)
                .item(&progress)
                .item(&separator)
                .item(&settings)
                .item(&separator2)
                .item(&exit)
                .build()?;

            TrayIconBuilder::new()
                .icon(icon)
                .tooltip("GameCore")
                .menu(&menu)
                .on_menu_event(|app, event| match event.id().as_ref() {
                    "exit" => app.exit(0),
                    id => {
                        if let Some(window) = app.get_webview_window("main") {
                            let _ = window.show();
                            let _ = window.set_focus();
                            let _ = window.emit("navigate", id);
                        }
                    }
                })
                .build(app)?;

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
