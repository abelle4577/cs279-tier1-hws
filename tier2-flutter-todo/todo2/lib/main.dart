import 'package:flutter/material.dart';

// this is where we define what a Todo is, that is stored in our array
// is checked? determines if there is a strike thru or not, can change initial state should be unchecked
// need the name of the todo item
// both fields are required

class Todo {
  Todo({required this.name, required this.checked});
  final String name;
  bool checked;
}

// takes a todo item from our list of todos and creates a single widget for each
class TodoItem extends StatelessWidget {
  // same structure as todo
  TodoItem({
    required this.todo,
    required this.onTodoChanged,
  }) : super(key: ObjectKey(todo));

  final Todo todo;
  final onTodoChanged;

// when an item is checked change its style so it it striked thru and greyed
  TextStyle? _getTextStyle(bool checked) {
    if (!checked) return null;

    return TextStyle(
      color: Colors.black54,
      decoration: TextDecoration.lineThrough,
    );
  }

  @override
  // put the widget together as a complete componenet
  // when tapped change the checked status
  // 
  Widget build(BuildContext context) {
    return ListTile(
      onTap: () {
        onTodoChanged(todo);
      },
      leading: CircleAvatar(
        child: Text(todo.name[0]),
      ),
      title: Text(todo.name, style: _getTextStyle(todo.checked)),
    );
  }
}

class TodoList extends StatefulWidget {
  @override
  _TodoListState createState() => new _TodoListState();
}


class _TodoListState extends State<TodoList> {
  // define a text controller and a list, list will hold todo items
  final TextEditingController _textFieldController = TextEditingController();
  // this is an array of todo items, we need to define them
  final List<Todo> _todos = <Todo>[];

  @override
  // Scaffold handles the structure of app, ie like where to put nav bar and the body of the application
  // AppBar is the NavBar
  // body will displayed, with the todo items as children
  // when the todo items are changed will be handled by function _handleTodoChange
  // floatingActionButton will appear when the plus button is clicked (will be dialought for adding a new todo task)
  Widget build(BuildContext context) {
    return new Scaffold(
      appBar: new AppBar(
        title: new Text('Todo list'),
      ),
      body: ListView(
        padding: EdgeInsets.symmetric(vertical: 8.0),
        children: _todos.map((Todo todo) {
          return TodoItem(
            todo: todo,
            onTodoChanged: _handleTodoChange,
          );
        }).toList(),
      ),
      floatingActionButton: FloatingActionButton(
          onPressed: () => _displayDialog(),
          tooltip: 'Add Item',
          child: Icon(Icons.add)),
    );
  }


// change the state of being chacked between being true or false, just the opposite of what it was before
  void _handleTodoChange(Todo todo) {
    setState(() {
      todo.checked = !todo.checked;
    });
  }


// actually takes the text entered in the popup by the user into the list
// use state to add to the list
// clear the text field
  void _addTodoItem(String name) {
    setState(() {
      _todos.add(Todo(name: name, checked: false));
    });
    _textFieldController.clear();
  }

// the actual pop up window when the plus button is clicked
// is a "future" b/c it isnt available immedeatly - we need to wait for the user to type some value
// Popup with textbox saying "typle your new todo"
// add and cancel button, add will close dialogue and add whatever was entered to the list, cancel wont add to the list
  Future<void> _displayDialog() async {
    return showDialog<void>(
      context: context,
      barrierDismissible: true, // user can close by tapping outside the box
      builder: (BuildContext context) {
        return AlertDialog(
          title: const Text('Add a new todo item'),
          content: TextField(
            controller: _textFieldController,
            decoration: const InputDecoration(hintText: 'Type your new todo'),
          ),
          actions: <Widget>[
            TextButton(
              child: const Text('Add'),
              onPressed: () {
                Navigator.of(context).pop();
                _addTodoItem(_textFieldController.text);
              },
            ),
            // cancel button
              TextButton(
                child: const Text('Cancel'),
                onPressed: () {
                  Navigator.of(context).pop();
                  _textFieldController.clear();
                },
              )
          ],
        );
      },
    );
  }
}


// right now, this app is stateless - we dont have to worry about updates at all
// it will return our list, which does have states, as the home page. 
// keeping this static page lets us have the styling with the nav bar, etc
class TodoApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return new MaterialApp(
      title: 'Todo list',
      home: new TodoList(),
    );
  }
}

// return the ToDo app we just made as the main function
void main() => runApp(new TodoApp());