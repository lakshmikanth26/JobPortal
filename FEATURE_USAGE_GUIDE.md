# Resume Filter Chat - Usage Guide 📖

## Quick Start Guide for Recruiters

### Step 1: Access the Feature
1. Login as a **Recruiter**
2. Go to **Admin Dashboard** → **Jobs**
3. Click **"Applicants"** on any job posting

### Step 2: Open the Chat
Look for the **teal circular icon** with a chat bubble in the bottom-right corner of the screen.

Click it to open the Resume Filter Assistant.

### Step 3: Ask What You Need

The chat assistant understands natural language. Just type what you're looking for!

#### 💡 Example Queries:

**For Freshers:**
- "JavaScript fresher"
- "Python developer with no experience"
- "Entry level React developer"
- "Graduate with Java skills"

**For Experienced Candidates:**
- "Java experience 5 years"
- "Senior Python developer 8+ years"
- "React and Node.js 3 years"
- "Full stack developer 4 years"

**For Specific Skills:**
- "React and TypeScript developer"
- "Data scientist with Python and ML"
- "DevOps engineer with Docker and Kubernetes"
- "Mobile developer with React Native"

**Complex Requirements:**
- "Senior Java developer with Spring Boot 5+ years"
- "Frontend developer React Vue 3 years"
- "Backend engineer Python Django 2 years experience"

### Step 4: Review Results

After you send your query:

1. **Bot responds** with the count of matching candidates
2. **Table updates** automatically to show only filtered results
3. **Header shows** filtered count vs total applicants
4. **Badge appears** saying "Showing filtered results"

Example:
```
Applicants (3)
Showing filtered results (Total: 15)
```

### Step 5: Reset Filter (Optional)

To see all applicants again, click the **"Show All"** button in the top-right corner.

---

## Understanding the Results

### What Gets Matched?

The system analyzes:
- ✅ **Skills** listed in candidate profile
- ✅ **Bio/Description** for experience years
- ✅ **Technology keywords** mentioned
- ✅ **Experience duration** (with ±1 year flexibility)

### Matching Logic

| Your Query | What It Matches |
|------------|----------------|
| "5 years" | Candidates with 4-6 years (±1 year) |
| "Fresher" | 0-1 year experience |
| "React" | Has "React" in skills or bio |
| "React 3 years" | Has React AND 2-4 years experience |

---

## Pro Tips 🎯

### ✅ Do's
- **Be specific but natural**: "Python developer 5 years" works great
- **Combine skills and experience**: "React and Node 3 years"
- **Use common terms**: "fresher", "junior", "senior"
- **Try variations**: If no results, try "4 years" instead of "5 years"

### ❌ Don'ts
- **Don't use complex sentences**: Keep it simple
- **Don't expect exact matches**: System allows ±1 year flexibility
- **Don't forget to reset**: Clear filters before new searches

---

## Common Use Cases

### Use Case 1: Hiring Freshers
**Scenario:** Need fresh graduates for training program

**Query:** `"Java fresher"`

**Result:** All candidates with:
- Java in skills
- 0-1 year experience or "fresher" mentioned

---

### Use Case 2: Mid-Level Developer
**Scenario:** Need experienced React developer

**Query:** `"React developer 3 years"`

**Result:** Candidates with:
- React in skills
- 2-4 years experience

---

### Use Case 3: Full Stack Position
**Scenario:** Need both frontend and backend skills

**Query:** `"React Node.js 4 years"`

**Result:** Candidates with:
- Both React and Node.js skills
- 3-5 years experience

---

### Use Case 4: Quick Screening
**Scenario:** 50 applicants, need to shortlist quickly

**Steps:**
1. Open chat: "Python Django 5 years" → 8 matches
2. Review these 8 candidates first
3. Reset and try: "Python 3 years" → 15 matches
4. Narrow down further as needed

---

## Keyboard Shortcuts ⌨️

- **Enter**: Send message
- **Shift + Enter**: New line in message
- **Escape**: Close chat (coming soon)

---

## Troubleshooting

### ❓ "No candidates match your requirements"

**Possible Reasons:**
1. Requirements too specific
2. Candidates haven't updated their profiles/skills
3. Experience years don't match

**Solutions:**
- Try broader terms: "Python" instead of "Python Django Flask"
- Adjust experience: Try "3 years" instead of "5 years"
- Search by skill only: Remove experience requirement
- Click "Show All" and review manually

---

### ❓ Too many results

**Solution:**
- Add more specific requirements
- Include experience years: "React 5 years" instead of just "React"
- Combine multiple skills: "React TypeScript Node.js"

---

### ❓ Chat not loading

**Checks:**
1. Is backend running on port 4000?
2. Are you logged in as a recruiter?
3. Check browser console for errors
4. Refresh the page

---

## Privacy & Data

- ✅ All filtering happens on your company's data only
- ✅ No data is sent to external AI services
- ✅ Filtering is temporary (doesn't modify database)
- ✅ Only authenticated recruiters can access this feature

---

## Need Help?

If you encounter issues:
1. Check that backend is running: `http://localhost:4000`
2. Ensure you're on the Applicants page
3. Try logging out and back in
4. Check that candidates have filled their profiles

---

## Example Conversation

```
👤 You: "React developer with 3 years experience"

🤖 Assistant: "Found 5 matching candidates! I've filtered the results for you."

[Table shows 5 filtered candidates]

👤 You: "Show me Node.js developers instead"

🤖 Assistant: "Found 8 matching candidates! I've filtered the results for you."

[Table updates to show 8 different candidates]
```

---

**Happy Recruiting! 🎉**

For technical details, see `RESUME_FILTER_FEATURE.md`

