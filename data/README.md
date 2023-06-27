# All the data

## Alabama

https://www.alabamaachieves.org/academic-standards/

```
JSON.stringify(Array.from(document.querySelectorAll('.wpb_content_element.wpb_text_column a')).filter((a) => a.href.includes('.pdf')).map((a) => ({label: a.innerText.trim(), href: a.href})))
```

## Alaska

https://education.alaska.gov/standards

```
JSON.stringify(Array.from(document.querySelectorAll('a')).filter((a) => a.href.includes('.pdf') || a.href.includes('.docx')).map((a) => ({label: a.innerText.trim(), href: a.href})))
```

## Arizona

Multiple pages.
https://www.azed.gov/standards-practices/k-12standards/arts-standards

```
JSON.stringify(Array.from(document.querySelectorAll('a')).filter((a) => a.href.includes('.pdf') || a.href.includes('.docx')).map((a) => ({label: a.innerText.trim(), href: a.href})))
```

## Arkansas

Multiple pages.
https://dese.ade.arkansas.gov/Offices/learning-services/curriculum-support/arkansas-academic-standards

```
JSON.stringify(Array.from(document.querySelectorAll('a')).filter((a) => a.href.includes('.pdf') || a.href.includes('.docx')).map((a) => ({label: a.innerText.trim(), href: a.href})))
```

## California

https://www.cde.ca.gov/be/st/ss/

```
JSON.stringify(Array.from(document.querySelectorAll('a')).filter((a) => a.href.includes('.pdf') || a.href.includes('.docx')).map((a) => ({label: a.innerText.trim(), href: a.href})))
```

## Colorado

https://www.cde.state.co.us/standardsandinstruction/standards

```
JSON.stringify(Array.from(document.querySelectorAll('a')).filter((a) => a.textContent.toLowerCase().includes('pdf')).map((a) => ({label: a.innerText.trim(), href: a.href})))
```

## Connecticut

https://portal.ct.gov/SDE/CT-Core-Standards

```
JSON.stringify(Array.from(document.querySelectorAll('a')).filter((a) => a.href.includes('.pdf') || a.href.includes('.docx')).map((a) => ({label: a.innerText.trim(), href: a.href})))
```

## Delaware

Multiple pages
https://www.doe.k12.de.us/domain/647

```
JSON.stringify(Array.from(document.querySelectorAll('a')).filter((a) => a.href.includes('.pdf') || a.href.includes('.docx')).map((a) => ({label: a.innerText.trim(), href: a.href})))
```

## Florida

Multiple pages
https://www.floridaeducationfoundation.org/standards

```
JSON.stringify(Array.from(document.querySelectorAll('a')).filter((a) => a.href.includes('.pdf') || a.href.includes('.docx')).map((a) => ({label: a.innerText.trim(), href: a.href})))
```

## Georgia

https://www.georgiastandards.org/

```
JSON.stringify(Array.from(document.querySelectorAll('a')).filter((a) => a.href.includes('.pdf')).map((a) => ({label: a.innerText.trim(), href: a.href})))
```

## Hawaii

https://www.hawaiipublicschools.org/TeachingAndLearning/StudentLearning/Pages/standards.aspx

```
JSON.stringify(Array.from(document.querySelectorAll('a')).filter((a) => a.href.includes('.pdf') || a.href.includes('.docx')).map((a) => ({label: a.innerText.trim(), href: a.href})))
```

## Idaho

https://www.sde.idaho.gov/academic/standards/

```
JSON.stringify(Array.from(document.querySelectorAll('a')).filter((a) => a.href.includes('.pdf') || a.href.includes('.docx')).map((a) => ({label: a.innerText.trim(), href: a.href})))
```

## Illinois

https://www.isbe.net/Pages/Standards-Courses.aspx

```
JSON.stringify(Array.from(document.querySelectorAll('a')).filter((a) => a.href.includes('.pdf') || a.href.includes('.docx')).map((a) => ({label: a.innerText.trim(), href: a.href})))
```

## Indiana

Multiple pages
https://www.in.gov/doe/students/indiana-academic-standards/

```
JSON.stringify(Array.from(document.querySelectorAll('a')).filter((a) => a.href.includes('.pdf')).map((a) => ({label: a.innerText.trim(), href: a.href})))
```

## Iowa

Multiple pages
https://educateiowa.gov/document-type/iowa-academic-standards

```
JSON.stringify(Array.from(document.querySelectorAll('a')).filter((a) => a.href.includes('.pdf') || a.href.includes('.docx')).map((a) => ({label: a.innerText.trim(), href: a.href})))
```

## Kansas

https://www.ksde.org/Teaching-Learning/Academic-Standards
HTML, skipped

```
JSON.stringify(Array.from(document.querySelectorAll('a')).filter((a) => a.href.includes('.pdf') || a.href.includes('.docx')).map((a) => ({label: a.innerText.trim(), href: a.href})))
```

## Kentucky

High quality, can come back
https://kystandards.org/standards-resources/

```
JSON.stringify(Array.from(document.querySelectorAll('a')).filter((a) => a.href.includes('.pdf') || a.href.includes('.docx')).map((a) => ({label: a.innerText.trim(), href: a.href})))
```

## Louisiana

https://www.louisianabelieves.com/resources/library/academic-standards

```
JSON.stringify(Array.from(document.querySelectorAll('a')).filter((a) => a.href.includes('.pdf') || a.href.includes('.docx')).map((a) => ({label: a.innerText.trim(), href: a.href})))
```

## Maine

https://www.maine.gov/doe/learning/content

```
JSON.stringify(Array.from(document.querySelectorAll('a')).filter((a) => a.href.includes('.pdf') || a.href.includes('.docx')).map((a) => ({label: a.innerText.trim(), href: a.href})))
```

## Maryland

Skipped

```
JSON.stringify(Array.from(document.querySelectorAll('a')).filter((a) => a.href.includes('.pdf') || a.href.includes('.docx')).map((a) => ({label: a.innerText.trim(), href: a.href})))
```

## Massachusetts

https://www.doe.mass.edu/frameworks/current.html

```
JSON.stringify(Array.from(document.querySelectorAll('a')).filter((a) => a.href.includes('.pdf') || a.href.includes('.docx')).map((a) => ({label: a.innerText.trim(), href: a.href})))
```

## Michigan

https://www.michigan.gov/mde/services/academic-standards

```
JSON.stringify(Array.from(document.querySelectorAll('a')).filter((a) => a.href.includes('.pdf') || a.href.includes('.docx')).map((a) => ({label: a.innerText.trim(), href: a.href})))
```

## Minnesota

Multi page
https://education.mn.gov/MDE/fam/stds/index.htm

```
JSON.stringify(Array.from(document.querySelectorAll('a')).filter((a) => a.href.includes('.pdf') || a.href.includes('GET_FILE')).map((a) => ({label: a.innerText.trim(), href: a.href})))
```

## Mississippi

https://www.mdek12.org/OAE/college-and-career-readiness-standards

```
JSON.stringify(Array.from(document.querySelectorAll('a')).filter((a) => a.href.includes('.pdf') || a.href.includes('.docx')).map((a) => ({label: a.innerText.trim(), href: a.href})))
```

## Missouri

skipped
https://dese.mo.gov/college-career-readiness/curriculum/missouri-learning-standards

```
JSON.stringify(Array.from(document.querySelectorAll('a')).filter((a) => a.href.includes('.pdf') || a.href.includes('.docx')).map((a) => ({label: a.innerText.trim(), href: a.href})))
```

## Montana

```
JSON.stringify(Array.from(document.querySelectorAll('a')).filter((a) => a.href.includes('.pdf') || a.href.includes('.docx')).map((a) => ({label: a.innerText.trim(), href: a.href})))
```

## Nebraska

```
JSON.stringify(Array.from(document.querySelectorAll('a')).filter((a) => a.href.includes('.pdf') || a.href.includes('.docx')).map((a) => ({label: a.innerText.trim(), href: a.href})))
```

## Nevada

```
JSON.stringify(Array.from(document.querySelectorAll('a')).filter((a) => a.href.includes('.pdf') || a.href.includes('.docx')).map((a) => ({label: a.innerText.trim(), href: a.href})))
```

## New Hampshire

```
JSON.stringify(Array.from(document.querySelectorAll('a')).filter((a) => a.href.includes('.pdf') || a.href.includes('.docx')).map((a) => ({label: a.innerText.trim(), href: a.href})))
```

## New Jersey

```
JSON.stringify(Array.from(document.querySelectorAll('a')).filter((a) => a.href.includes('.pdf') || a.href.includes('.docx')).map((a) => ({label: a.innerText.trim(), href: a.href})))
```

## New Mexico

```
JSON.stringify(Array.from(document.querySelectorAll('a')).filter((a) => a.href.includes('.pdf') || a.href.includes('.docx')).map((a) => ({label: a.innerText.trim(), href: a.href})))
```

## New York

https://www.nylearns.org/module/standards/Pages/DownloadPDFs

```
JSON.stringify(Array.from(document.querySelectorAll('a')).filter((a) => a.href.includes('.pdf') || a.href.includes('.docx')).map((a) => ({label: a.innerText.trim(), href: a.href})))
```

## North Carolina

```
JSON.stringify(Array.from(document.querySelectorAll('a')).filter((a) => a.href.includes('.pdf') || a.href.includes('.docx')).map((a) => ({label: a.innerText.trim(), href: a.href})))
```

## North Dakota

```
JSON.stringify(Array.from(document.querySelectorAll('a')).filter((a) => a.href.includes('.pdf') || a.href.includes('.docx')).map((a) => ({label: a.innerText.trim(), href: a.href})))
```

## Ohio

https://education.ohio.gov/Topics/Learning-in-Ohio/Standard-Revision-Overview

```
JSON.stringify(Array.from(document.querySelectorAll('a')).filter((a) => a.href.includes('.pdf') || a.href.includes('.docx')).map((a) => ({label: a.innerText.trim(), href: a.href})))
```

## Oklahoma

```
JSON.stringify(Array.from(document.querySelectorAll('a')).filter((a) => a.href.includes('.pdf') || a.href.includes('.docx')).map((a) => ({label: a.innerText.trim(), href: a.href})))
```

## Oregon

```
JSON.stringify(Array.from(document.querySelectorAll('a')).filter((a) => a.href.includes('.pdf') || a.href.includes('.docx')).map((a) => ({label: a.innerText.trim(), href: a.href})))
```

## Pennsylvania

https://www.pdesas.org/Page/Viewer/ViewPage/11/?SectionPageItemId=457

```
JSON.stringify(Array.from(document.querySelectorAll('a')).filter((a) => a.href.includes('.pdf') || a.href.includes('.docx')).map((a) => ({label: a.innerText.trim(), href: a.href})))
```

## Rhode Island

```
JSON.stringify(Array.from(document.querySelectorAll('a')).filter((a) => a.href.includes('.pdf') || a.href.includes('.docx')).map((a) => ({label: a.innerText.trim(), href: a.href})))
```

## South Carolina

```
JSON.stringify(Array.from(document.querySelectorAll('a')).filter((a) => a.href.includes('.pdf') || a.href.includes('.docx')).map((a) => ({label: a.innerText.trim(), href: a.href})))
```

## South Dakota

```
JSON.stringify(Array.from(document.querySelectorAll('a')).filter((a) => a.href.includes('.pdf') || a.href.includes('.docx')).map((a) => ({label: a.innerText.trim(), href: a.href})))
```

## Tennessee

```
JSON.stringify(Array.from(document.querySelectorAll('a')).filter((a) => a.href.includes('.pdf') || a.href.includes('.docx')).map((a) => ({label: a.innerText.trim(), href: a.href})))
```

## Texas

https://tea.texas.gov/academics/curriculum-standards/teks-review/texas-essential-knowledge-and-skills

```
JSON.stringify(Array.from(document.querySelectorAll('a')).filter((a) => a.href.includes('.pdf') || a.href.includes('.docx')).map((a) => ({label: a.innerText.trim(), href: a.href})))
```

## Utah

```
JSON.stringify(Array.from(document.querySelectorAll('a')).filter((a) => a.href.includes('.pdf') || a.href.includes('.docx')).map((a) => ({label: a.innerText.trim(), href: a.href})))
```

## Vermont

```
JSON.stringify(Array.from(document.querySelectorAll('a')).filter((a) => a.href.includes('.pdf') || a.href.includes('.docx')).map((a) => ({label: a.innerText.trim(), href: a.href})))
```

## Virginia

```
JSON.stringify(Array.from(document.querySelectorAll('a')).filter((a) => a.href.includes('.pdf') || a.href.includes('.docx')).map((a) => ({label: a.innerText.trim(), href: a.href})))
```

## Washington

```
JSON.stringify(Array.from(document.querySelectorAll('a')).filter((a) => a.href.includes('.pdf') || a.href.includes('.docx')).map((a) => ({label: a.innerText.trim(), href: a.href})))
```

## West Virginia

```
JSON.stringify(Array.from(document.querySelectorAll('a')).filter((a) => a.href.includes('.pdf') || a.href.includes('.docx')).map((a) => ({label: a.innerText.trim(), href: a.href})))
```

## Wisconsin

```
JSON.stringify(Array.from(document.querySelectorAll('a')).filter((a) => a.href.includes('.pdf') || a.href.includes('.docx')).map((a) => ({label: a.innerText.trim(), href: a.href})))
```

## Wyoming

```
JSON.stringify(Array.from(document.querySelectorAll('a')).filter((a) => a.href.includes('.pdf') || a.href.includes('.docx')).map((a) => ({label: a.innerText.trim(), href: a.href})))
```
