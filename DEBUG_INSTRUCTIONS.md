# React Developer Tools Debugging Guide

This application contains several intentional bugs that can be identified and fixed using React Developer Tools. Follow this guide to debug the application systematically.

## Setup Instructions

1. **Install React Developer Tools**
   - For Chrome: Install "React Developer Tools" extension from Chrome Web Store
   - For Firefox: Install "React Developer Tools" add-on from Firefox Add-ons
   - For standalone: Download from https://github.com/facebook/react/tree/main/packages/react-devtools

2. **Open the Application**
   - Start the development server: `npm run dev`
   - Open the application in your browser
   - Open browser DevTools (F12)
   - Look for the "Components" and "Profiler" tabs

## Bugs to Find and Fix

### Bug 1: Missing useEffect Dependency
**Location**: `src/components/TodoList.tsx` - Line 23
**Issue**: useEffect has an empty dependency array but uses `todos`
**How to Debug**:
1. Open Components tab in React DevTools
2. Find TodoList component
3. Look at the hooks section - you'll see the effect
4. Add/remove todos and notice the console log doesn't update
5. **Fix**: Add `[todos]` to the dependency array

### Bug 2: State Mutation
**Location**: `src/components/TodoList.tsx` - Line 28-33
**Issue**: Direct state mutation instead of immutable update
**How to Debug**:
1. Try toggling a todo's completion status
2. Notice it doesn't update in the UI
3. In Components tab, check TodoList state - it shows the mutation happened
4. **Fix**: Use immutable update pattern:
   ```typescript
   const toggleTodo = (id: number) => {
     setTodos(prevTodos => 
       prevTodos.map(todo => 
         todo.id === id ? { ...todo, completed: !todo.completed } : todo
       )
     );
   };
   ```

### Bug 3: Missing Key Prop
**Location**: `src/components/TodoList.tsx` - Line 75-80
**Issue**: TodoItem components rendered without key prop
**How to Debug**:
1. Check browser console for React warnings
2. In Components tab, look at the TodoItem instances
3. **Fix**: Add key prop:
   ```typescript
   {filteredTodos.map(todo => (
     <TodoItem
       key={todo.id}
       todo={todo}
       onToggle={toggleTodo}
       onDelete={deleteTodo}
     />
   ))}
   ```

### Bug 4: Expensive Operation on Every Render
**Location**: `src/components/TodoItem.tsx` - Line 25-31
**Issue**: Expensive calculation runs on every render
**How to Debug**:
1. Open Profiler tab in React DevTools
2. Start recording
3. Interact with todos (toggle, add, delete)
4. Notice TodoItem components taking longer to render
5. Check console for "Expensive calculation running" messages
6. **Fix**: Use useMemo:
   ```typescript
   const expensiveResult = useMemo(() => {
     console.log('Expensive calculation running for todo:', todo.id);
     let result = 0;
     for (let i = 0; i < 1000000; i++) {
       result += i;
     }
     return result;
   }, [todo.id]);
   ```

### Bug 5: Memory Leak - Interval Not Cleaned Up
**Location**: `src/components/Counter.tsx` - Line 10-18
**Issue**: setInterval not cleared when component unmounts or autoIncrement changes
**How to Debug**:
1. Enable auto-increment in Counter
2. Navigate away or toggle auto-increment off
3. Check if interval is still running (console logs continue)
4. **Fix**: Add cleanup function:
   ```typescript
   useEffect(() => {
     if (autoIncrement) {
       const interval = setInterval(() => {
         setCount(prev => prev + 1);
       }, 1000);
       
       return () => clearInterval(interval);
     }
   }, [autoIncrement]);
   ```

### Bug 6: Stale Closure
**Location**: `src/components/Counter.tsx` - Line 21-26
**Issue**: setTimeout captures stale `count` value
**How to Debug**:
1. Set counter to 5
2. Click "Double Count (after 1s)"
3. Before the timeout, increment counter to 10
4. Notice the result is 10 (5*2) instead of 20 (10*2)
5. **Fix**: Use functional update:
   ```typescript
   const handleDoubleCount = () => {
     setTimeout(() => {
       setCount(prev => prev * 2);
     }, 1000);
   };
   ```

### Bug 7: Missing useEffect for Prop Changes
**Location**: `src/components/UserProfile.tsx` - Line 20-22
**Issue**: editForm doesn't update when user prop changes
**How to Debug**:
1. Start editing user profile
2. Cancel editing
3. Change user data from parent (if implemented)
4. Start editing again - shows old data
5. **Fix**: Add useEffect:
   ```typescript
   useEffect(() => {
     setEditForm(user);
   }, [user]);
   ```

## React DevTools Features to Use

### Components Tab
- **Component Tree**: Navigate through the component hierarchy
- **Props**: Inspect props passed to components
- **State**: View and modify component state
- **Hooks**: See all hooks and their values
- **Source**: Jump to component source code

### Profiler Tab
- **Performance Analysis**: Record component renders and identify bottlenecks
- **Render Reasons**: Understand why components re-render
- **Flame Graph**: Visualize render times
- **Ranked Chart**: See which components take longest to render

### Console Integration
- **$r**: Reference to currently selected component
- **console.log**: Add logging to trace component behavior

## Debugging Process

1. **Start with Console Warnings**: Always check browser console first
2. **Use Components Tab**: Inspect component state and props
3. **Profile Performance**: Use Profiler to identify render issues
4. **Test Interactions**: Click through the app while monitoring DevTools
5. **Verify Fixes**: Ensure each fix resolves the specific issue
6. **Re-test**: Make sure fixes don't introduce new bugs

## Expected Behavior After Fixes

- Todos toggle correctly
- No console warnings about keys
- Smooth performance when interacting with todos
- Counter auto-increment stops when disabled
- Double count uses current value
- User profile editing works correctly
- No memory leaks or performance issues

## Additional Debugging Tips

1. **Enable React Strict Mode**: Already enabled in main.tsx
2. **Use React DevTools Profiler**: Record interactions to find performance issues
3. **Check Network Tab**: Ensure no unnecessary API calls
4. **Monitor Memory**: Use browser's Memory tab to check for leaks
5. **Test Edge Cases**: Try rapid clicks, empty inputs, etc.