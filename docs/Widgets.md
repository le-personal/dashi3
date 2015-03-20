# Widgets
All widgets are made with angular.js although you can include any JavaScript that you like. There are however some conventions when creating widgets.

## Conventions
In order to create a widget, you must create a new directory with the name of the widget, this name must be unique and must not contain spaces.

1. A widget must have a widget.js file.
2. The widget must extend the angular module dashi3. Ej. angular.module("dashi3")
3. All controllers must be unique, the convention used to define controllers is Widget<NameOfWidget>Controller
4. Defining directives, services and factories must be done in the widget file and the names must be unique.
5. A widget must have a widget.ejs file, which is the template file.
6. A widget can have a settings.ejs file to handle settings
7. A widget can have a form.ejs file. This file is used to define a form that is used to send data to the widget.
8. The API defines a series of routes that must be used to retrieve the settings.ejs and form.ejs file:

		/widgets/<name>/settings
		/widgets/<name>/form

9. The use of modals is recommended:

		/**
		 * React to event "openWidgetSettings"
		 * @type {[type]}
		 */
		$scope.openWidgetSettings = function(widget) {
			$modal.open({
				templateUrl: "/widgets/mywidget/settings",
				controller: "OpenWidgetStatusSettings",
				resolve: {
					widget: function() {
						return $scope.widget;
					}
				}
			});
		}

