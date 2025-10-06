# Global Resume Filter Chat Feature 🤖

## Overview
Added an AI-powered chat assistant for recruiters to intelligently filter job applicants **across ALL jobs** based on natural language requirements. The chat icon appears on the Companies page and searches through all applications from all job postings.

## Features

### 1. **Floating Chat Icon** 
- Appears in the bottom-right corner on the **Companies page** (`/admin/companies`)
- Clean, modern design with teal color scheme
- Animated with pulse effect and "AI" badge
- Smooth animations and transitions
- Searches across ALL job postings

### 2. **Natural Language Filtering**
Recruiters can type requirements in plain English:
- "Java experience 5 years"
- "JavaScript fresher" 
- "Python and React skills"
- "MBA graduate with 2+ years experience"

### 3. **Smart Resume Parsing**
The backend intelligently:
- Extracts skills from user profiles and bios
- Parses experience years (handles "5+ years", "5 yr", etc.)
- Identifies freshers (0-1 year experience)
- Matches technology keywords
- Provides flexible matching (±1 year for experience)

### 4. **Global Search with Results Page**
- Searches across ALL job postings simultaneously
- Shows results in a dedicated filtered candidates page
- Displays matching jobs, total stats, and candidate details
- Export results to CSV functionality
- Contact information and resume links readily available

## Files Created/Modified

### Frontend
1. **`src/components/admin/GlobalResumeFilterChat.jsx`** (NEW)
   - Global floating chat icon component with AI badge
   - Chat interface with messages and conversation history
   - API integration for filtering across all jobs
   - "View Results" button to navigate to results page

2. **`src/components/admin/FilteredCandidates.jsx`** (NEW)
   - Dedicated results page for filtered candidates
   - Statistics dashboard (matching candidates, total applicants, jobs)
   - Detailed candidate table with contact info
   - Export to CSV functionality
   - Skills badges and resume links

3. **`src/components/admin/Companies.jsx`** (MODIFIED)
   - Integrated GlobalResumeFilterChat component
   - Chat icon visible on Companies page

4. **`src/App.jsx`** (MODIFIED)
   - Added route for `/admin/filtered-candidates`
   - Protected route for filtered results page

### Backend
5. **`Backend/controllers/application.controller.js`** (MODIFIED)
   - Added `filterAllResumes` function (searches across all recruiter's jobs)
   - Smart requirement parsing logic
   - Experience and skill matching algorithms
   - Returns matching jobs list and statistics

6. **`Backend/route/application.route.js`** (MODIFIED)
   - Added `/filter-all-resumes` POST endpoint
   - Protected with authentication middleware
   - Searches all jobs for the authenticated recruiter

## How It Works

### User Flow
1. Recruiter logs in and navigates to **Companies page** (`/admin/companies`)
2. Sees animated floating chat icon with "AI" badge in bottom-right corner
3. Clicks the chat icon to open the assistant
4. Types requirement (e.g., "React developer with 3 years experience")
5. Clicks Send or presses Enter
6. Backend searches ALL jobs posted by the recruiter and filters applicants based on:
   - Skills mentioned in profile
   - Experience years in bio
   - Technology keywords
7. Chat shows count of matching candidates and matching jobs
8. Clicks "View Results" button to see detailed results page
9. Results page shows:
   - Statistics dashboard
   - List of matching jobs
   - Detailed candidate table with contact info
   - Export to CSV option

### Technical Flow
```
User Input → Frontend Chat Component → API Call → Backend Parser
     ↓                                                    ↓
Display Results ← Frontend State Update ← Filtered Data ← Match Algorithm
```

## API Endpoint

### POST `/api/v1/application/filter-resumes`

**Request Body:**
```json
{
  "jobId": "65f4b3c2d1234567890abcde",
  "requirement": "Java experience 5 years"
}
```

**Response:**
```json
{
  "message": "Found 3 matching candidates",
  "filteredApplicants": [...],
  "totalApplicants": 15,
  "success": true
}
```

## Filtering Logic

### 1. **Fresher Detection**
Keywords: `fresher`, `0 year`, `no experience`, `entry level`, `graduate`
- Matches candidates with 0-1 years experience

### 2. **Experience Matching**
- Extracts numbers from requirement
- Parses experience from candidate bio
- Allows ±1 year flexibility

### 3. **Skill Matching**
- Extracts technology/skill keywords
- Matches against candidate skills array
- Checks bio for additional mentions

### 4. **Combined Filtering**
- Must match BOTH skill AND experience (if specified)
- Case-insensitive matching
- Handles various formats ("5 years", "5+ years", "5yr")

## Examples

### Example 1: Fresher Search
**Input:** "JavaScript fresher"
**Matches:**
- Candidates with "fresher" in bio
- Candidates with 0-1 year experience
- Having JavaScript in skills

### Example 2: Experienced Developer
**Input:** "Python developer 5 years"
**Matches:**
- Candidates with "Python" in skills
- Having 4-6 years experience (±1 year)

### Example 3: Multiple Skills
**Input:** "React and Node.js 3 years"
**Matches:**
- Candidates with both React and Node.js
- Having 2-4 years experience

## UI Components

### Chat Window
- **Header:** Teal background with title and close button
- **Messages Area:** Scrollable conversation history
- **Input Box:** Multi-line textarea with send button
- **Loading State:** Spinner with "Analyzing resumes..." message

### Applicants Page Enhancements
- **Filter Badge:** Shows "Showing filtered results"
- **Count Display:** Shows filtered vs total count
- **Reset Button:** "Show All" with refresh icon

## Testing

### To Test the Feature:

1. **Start Backend:**
   ```bash
   cd Backend
   npm run dev
   ```

2. **Start Frontend:**
   ```bash
   npm run dev
   ```

3. **Login as Recruiter**

4. **Navigate to any job's applicants:**
   - Go to Admin Jobs
   - Click "Applicants" on any job

5. **Test Chat:**
   - Click floating chat icon
   - Try different queries:
     - "Java experience 5 years"
     - "Python fresher"
     - "React and Node skills"

## Future Enhancements

Potential improvements:
- [ ] Save chat history per job
- [ ] Export filtered results to CSV
- [ ] Advanced filters (location, education, etc.)
- [ ] AI suggestions based on job description
- [ ] Bulk actions on filtered results
- [ ] Filter history and saved searches
- [ ] Multi-criteria filtering (OR conditions)

## Dependencies Used

- **lucide-react:** Icons (MessageCircle, X, Send, Loader2, RefreshCw)
- **axios:** API calls
- **sonner:** Toast notifications
- **React hooks:** useState for state management

## Browser Compatibility

Tested and working on:
- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)

## Notes

- Chat icon only appears on authenticated recruiter pages
- Filtering is real-time (no page refresh needed)
- Original applicant list remains unchanged in Redux store
- Filters are reset when navigating away from page
- Backend uses case-insensitive matching for better results

---

**Created:** October 2025
**Feature Status:** ✅ Fully Implemented & Tested

