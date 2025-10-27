# 🐰 Scroll to Top Cartoon Button

## ✨ Features

A cute animated cartoon button that:
- ✅ Appears at bottom-right when you scroll down 300px
- ✅ Runs/jumps upward when clicked
- ✅ Smoothly scrolls page to top
- ✅ Disappears with animation after scrolling
- ✅ Bounces when idle
- ✅ Gets excited on hover
- ✅ Works on all pages automatically

---

## 🎨 Customize the Cartoon

You can change the cartoon character to anything you want!

### Current Character: 🐰 (Rabbit)

### Other Cute Options:

**Animals:**
- 🐰 Rabbit (current)
- 🐱 Cat
- 🐶 Dog
- 🐻 Bear
- 🐼 Panda
- 🐨 Koala
- 🐹 Hamster
- 🦊 Fox
- 🐸 Frog
- 🐧 Penguin

**Hearts & Love:**
- 💖 Sparkling Heart
- 💗 Growing Heart
- 💓 Beating Heart
- 💝 Heart with Ribbon
- 💞 Revolving Hearts

**Cute Characters:**
- 😊 Smiling Face
- 🥰 Smiling Face with Hearts
- 😇 Angel
- 🌟 Star
- ⭐ White Star
- ✨ Sparkles
- 🎈 Balloon
- 🎀 Ribbon

**Romantic:**
- 🌹 Rose
- 🌸 Blossom
- 🦋 Butterfly
- 🕊️ Dove

---

## 📝 How to Change the Cartoon

**File:** `src/app/shared/scroll-to-top/scroll-to-top.component.ts`

**Line 12:** Change the emoji in `<div class="cartoon-character">🐰</div>`

Example:
```html
<div class="cartoon-character">💖</div>  <!-- Sparkling Heart -->
<div class="cartoon-character">🐱</div>  <!-- Cat -->
<div class="cartoon-character">🦋</div>  <!-- Butterfly -->
```

---

## 🎨 Customize Colors

In the same file, you can change the button colors:

**Line 22-23:** Background gradient
```css
background: linear-gradient(135deg, #ffb3d9, #ffc9e3);
```

**Change to:**
- Pink to Purple: `#ffb3d9, #d8b3ff`
- Blue to Pink: `#b3d9ff, #ffb3d9`
- Mint to Pink: `#b3ffd9, #ffb3d9`
- Peach: `#ffd9b3, #ffc9e3`

---

## 🔧 Adjust Behavior

**Show button after scrolling X pixels:**
Line 115: Change `300` to your preferred value
```typescript
this.showButton.set(scrollPosition > 300);
```

**Animation speed:**
Line 73: Change `1s` (1 second) to adjust running animation speed
```css
animation: runToTop 1s cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

---

## 📱 Mobile Responsive

The button automatically:
- Shrinks on mobile (50x50px)
- Positions at bottom-right with proper spacing
- Works perfectly on touch devices

---

**Enjoy your cute scroll-to-top button! 🎉💖**
