---
name: design-doc
description: 설계서(doc/excel/*.xlsx) 리뷰·작성·수정. 화면설계서, 테이블정의서 등 설계서 엑셀을 다룰 때 반드시 사용한다. 사용자가 보는 앞에서 Excel 창을 띄워 직접 고친다.
---

# 설계서 작업 (Excel 실시간 편집)

설계서는 `doc/excel/` 아래 엑셀 파일이다. 일본 SIer 「基本設計書」 스타일을 따른다.
- 화면설계서: 표지 / 개정이력 / 화면개요 / 화면레이아웃 / 화면항목정의 / 이벤트정의 / 입력체크 / 메시지목록
- 테이블정의서: `테이블정의서_HOSHIMOTO_AIR.xlsx`

## 규칙
1. **항상 Excel 창을 띄워서 작업한다.** openpyxl로 몰래 고치지 않는다. 사용자가 고쳐지는 과정을 눈으로 본다.
2. **리뷰나 수정 전에 모든 시트를 끝까지 읽는다.** 시트 하나만 보고 "빠졌다"고 말하지 않는다. (예: 입력 체크는 「입력체크」 시트, 메시지는 「메시지목록」 시트에 따로 있다.)
3. 설계서 내용은 실제 코드·`docs/specs/specs.md`·`frontend/SCREENS.md`와 맞는지 대조한다. (API 경로, 파라미터 이름, 에러 코드)
4. 판단이 필요한 부분(문구, 메시지 ID, 범위)은 임의로 정했으면 끝에 "임의로 정한 것"으로 따로 알린다.
5. **저장은 사용자가 확인한 뒤에만 한다.**
6. 수정하면 「개정이력」 시트에 판수·개정일·개정 위치·개정 내용을 한 줄 추가한다. 개정자는 비워 둔다.
7. 행 번호(No)가 바뀌면 다른 시트에서 그 번호를 참조하는 곳(예: 「이벤트정의 No.6 참조」)도 같이 고친다.

## 방법 (PowerShell + Excel COM)

PowerShell 명령에 한글을 그대로 넣어도 된다. 스크립트 파일(.ps1)로 만들면 PS 5.1이 한글을 깨뜨리므로 인라인 명령으로 실행한다.

### 0. 이미 열려 있는지 먼저 확인
같은 파일을 두 번 열면 "다시 여시겠습니까?" 확인 창이 떠서 Excel이 멈춘다(RPC_E_CALL_REJECTED). 반드시 먼저 확인한다.
```powershell
Get-Process EXCEL -ErrorAction SilentlyContinue | Select-Object Id, MainWindowTitle
```
- 파일이 이미 열려 있으면 → 2번(붙어서 작업)
- 없으면 → 1번(열기)
- 명령이 거절되면 다시 열지 말고, 사용자에게 확인 창이나 셀 편집 상태가 있는지 봐 달라고 한다.

### 1. 열기 (처음 한 번)
```powershell
$xl = New-Object -ComObject Excel.Application
$xl.Visible = $true
$wb = $xl.Workbooks.Open("C:\Users\lee\Desktop\hoshimoto\02_projects\loveMyself\doc\excel\<파일명>.xlsx")
$wb.Worksheets.Item("<시트명>").Activate()
```

### 2. 이후 명령은 열린 Excel에 붙어서 작업
```powershell
$xl = [Runtime.InteropServices.Marshal]::GetActiveObject("Excel.Application")
$ws = $xl.ActiveWorkbook.Worksheets.Item("<시트명>")
$ws.Activate()
```

### 3. 자주 쓰는 조작
- 셀 값: `$ws.Cells.Item(행, 열).Value2 = "값"` (병합 셀은 왼쪽 위 셀에 쓴다)
- 셀 안 줄바꿈: `$lf = [char]10` 후 `"첫 줄$lf둘째 줄"`
- 병합 범위 확인: `$ws.Cells.Item(행, 열).MergeArea.Address()`
- 행 추가(서식·병합 유지): 서식을 따올 행을 복사한 뒤 삽입
  ```powershell
  $ws.Rows.Item(7).Copy() | Out-Null
  $ws.Rows.Item("8:9").Insert() | Out-Null
  $xl.CutCopyMode = $false
  ```
- 행 높이: `$ws.Rows.Item(행).RowHeight = 36` (줄 수 × 약 14)
- 고친 곳 보여 주기: `$ws.Range("A8:AN9").Select() | Out-Null`
- 저장(사용자 확인 후): `$xl.ActiveWorkbook.Save()`

### 4. 진행 방식
- 시트 하나를 고칠 때마다 무엇을 고쳤는지 한 줄로 알리고 다음 시트로 넘어간다.
- 끝나면 시트별로 고친 내용을 정리하고, 저장할지 묻는다.
