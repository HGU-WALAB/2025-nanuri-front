import book from "../../assets/images/items/book.jpeg";
import mouse from "../../assets/images/items/mouse.jpeg";
import shirt from "../../assets/images/items/shirt.jpeg";
import shoes from "../../assets/images/items/shoes.jpeg";
import tumblr from "../../assets/images/items/tumblr.jpeg";
import keyboard from "../../assets/images/items/keyboard.jpeg";
import charger from "../../assets/images/items/charger.jpeg";
import pencilCase from "../../assets/images/items/pencilCase.jpeg";
import cap from "../../assets/images/items/cap.jpeg";
import pencil from "../../assets/images/items/pencil.jpeg";
import chair from "../../assets/images/items/chair.jpeg";

export const mockItems = [
    {
        "id" : 0,
        "title" : "책 나눔 합니다",
        "description" : "자바 공부하시는 분들께 도움될 만한 책을 나눔하려고 합니다! " +
            "대학교 과정 문제집과 개념서 몇 권이며, 필기나 밑줄이 조금 있지만 공부하는 데 지장은 없습니다. " +
            "필요하신 분께 무료로 드리며, 직접 오셔서 가져가시면 좋습니다. 다음 필요한 분들께도 이어서 잘 사용해 주시면 감사하겠습니다.",
        "photo": book,
        "ago": "10분 전",
        "viewCount": 11,
        "category": "도서",
        "nickname": "닉네임 0",
        "wishCount": 4,
        "completionTime": "2025/03/13",
        "isOwner" : true
    },
    {
        "id" : 1,
        "title" : "마우스 나눔 합니다",
        "description" : "사용하지 않는 유선/무선 마우스를 나눔하려고 합니다! " +
            "기본적인 사무용 마우스로 작동은 정상적으로 되며, 큰 흠집 없이 깨끗한 상태입니다. " +
            "필요하신 분께 무료로 드리며, 직접 오셔서 가져가시면 좋습니다. 환경을 생각해 꼭 필요한 분이 가져가셨으면 좋겠습니다. ",
        "photo": mouse,
        "ago": "22분 전",
        "viewCount": 15,
        "category": "디지털기기",
        "nickname": "닉네임 1",
        "wishCount":13,
        "completionTime": "2025/03/13"
    },
    {
        "id" : 2,
        "title" : "셔츠 나눔 합니다",
        "description" : "깨끗하게 세탁한 셔츠 몇 장을 나눔하려고 합니다! " +
            "사이즈는 M~L 정도이며, 기본 화이트 셔츠와 캐주얼 체크 셔츠가 포함되어 있어요. " +
            "몇 번 입었지만 상태는 양호하며, 필요하신 분께 무료로 드립니다. 직접 오셔서 가져가시면 좋고, " +
            "가능하면 환경을 생각해 에코백이나 장바구니를 지참해 주세요. 관심 있으신 분은 신청해주세요 😊",
        "photo": shirt,
        "ago": "34분 전",
        "viewCount": 33,
        "category": "의류",
        "nickname": "닉네임 2",
        "wishCount": 8,
        "completionTime": "2025/03/13"
    },
    {
        "id" : 3,
        "title" : "신발 나눔 합니다",
        "description" : "이 신발은 깨끗하게 사용했으며, 아직도 충분히 좋은 상태입니다. 사이즈는 280이며, 편안한 착용감을 제공합니다. " +
            "필요하신 분이 자유롭게 가져가셔서 잘 활용해 주시면 좋겠습니다. 나눔이 필요한 분께 먼저 드리고 싶으니, 정말 필요하신 분이 연락 주세요. " +
            "직접 전달 가능하며, 장소는 뉴턴홀에서 조율 가능합니다! 😊",
        "photo": shoes,
        "ago": "41분 전",
        "viewCount": 44,
        "category": "의류",
        "nickname": "닉네임 3",
        "wishCount": 15,
        "completionTime": "2025/03/13"
    },
    {
        "id" : 4,
        "title" : "텀블러 나눔 합니다",
        "description" : "사용하지 않는 텀블러를 나눔합니다! 용량은 500ml이며, 깨끗하게 세척해 두었습니다. " +
            "보온·보냉 기능이 좋아서 일상에서 유용하게 사용할 수 있습니다. 필요하신 분이 잘 활용해 주시면 좋겠습니다. " +
            "나눔이니 부담 없이 연락 주세요! 직접 전달 가능하며, 장소는 학관 앞에서 조율 가능합니다. 😊",
        "photo": tumblr,
        "ago": "50분 전",
        "viewCount": 25,
        "category": "생활/주방",
        "nickname": "닉네임 4",
        "wishCount": 2,
        "completionTime": "2025/03/13"
    },
    {
        "id" : 5,
        "title" : "키보드 나눔 합니다",
        "description" : "키보드 나눔합니다! 정상 작동합니다." +
            " 타건감도 좋고 사용감은 있지만 깨끗하게 관리했습니다. 필요하신 분이 유용하게 사용해 주시면 좋겠습니다. " +
            "나눔이니 부담 없이 연락 주세요! 직접 전달 가능하며, 장소는 뉴턴홀에서 조율 가능합니다. 😊",
        "photo": keyboard,
        "ago": "1시간 전",
        "viewCount": 51,
        "category": "디지털기기",
        "nickname": "닉네임 5",
        "wishCount": 15,
        "completionTime": "2025/03/13"
    },
    {
        "id" : 6,
        "title" : "충전기 나눔 합니다",
        "description" : "충전기 나눔합니다! 모델은 abc 이며, 정상 작동합니다. " +
            "필요하신 분이 유용하게 사용해 주시면 좋겠습니다. " +
            "나눔이니 부담 없이 연락 주세요! 직접 전달 가능하며, 장소는 학관 앞에서 조율 가능합니다. 😊",
        "photo": charger,
        "ago": "1시간 전",
        "viewCount": 25,
        "category": "생활가전",
        "nickname": "닉네임 6",
        "wishCount":27,
        "completionTime": "2025/03/13"
    },
    {
        "id" : 7,
        "title" : "필통 나눔 합니다",
        "description" : "필통 나눔합니다! 색상은 블루이며, 깔끔하고 실용적인 디자인입니다. " +
            "내부는 여러 개의 칸으로 나뉘어 있어, 다양한 문구류를 정리하기에 좋습니다. 사용감은 있지만 상태는 아주 좋습니다. " +
            "필요하신 분이 잘 활용해 주시면 좋겠습니다. 나눔이니 부담 없이 연락 주세요! 직접 전달 가능합니다.",
        "photo": pencilCase,
        "ago": "1시간 전",
        "viewCount": 75,
        "category": "문구",
        "nickname": "닉네임 7",
        "wishCount": 11,
        "completionTime": "2025/03/13"
    },
    {
        "id" : 8,
        "title" : "모자 나눔 합니다",
        "description" : "모자 나눔합니다! 색상은 네이비이며, 사이즈는 자유롭게 조절 가능한 스트랩이 있어 편안하게 착용할 수 있습니다. " +
            "디자인은 간단하면서도 스타일리시하여 다양한 outfits와 잘 어울립니다. 사용감은 있지만 깨끗하게 관리했습니다. " +
            "필요하신 분이 잘 활용해 주시면 좋겠습니다. 나눔이니 부담 없이 연락 주세요! 직접 전달 가능합니다.",
        "photo": cap,
        "ago": "2시간 전",
        "viewCount": 44,
        "category": "의류",
        "nickname": "닉네임 8",
        "wishCount": 13,
        "completionTime": "2025/03/13"
    },
    {
        "id" : 9,
        "title" : "연필 나눔 합니다",
        "description" : "연필 나눔합니다! 색상은 클래식한 검정색 입니다. 연필은 모두 새것이며, " +
            "글씨가 부드럽게 써집니다. 학업이나 취미용으로 유용하게 사용할 수 있습니다." +
            " 나눔이니 필요하신 분이 부담 없이 가져가세요! 직접 전달 가능합니다.",
        "photo": pencil,
        "ago": "2시간 전",
        "viewCount": 22,
        "category": "문구",
        "nickname": "닉네임 9",
        "wishCount": 14,
        "completionTime": "2025/03/13"
    },
    {
        "id" : 10,
        "title" : "의자 나눔 합니다",
        "description" : "의자 나눔합니다! 간단한 디자인으로 어떤 공간에도 잘 어울립니다. " +
            "사용감은 있지만 상태는 양호하고, 앉았을 때 편안합니다. 사무실이나 공부방, 혹은 집에서 사용하기 좋습니다. " +
            "나눔이니 정말 필요하신 분이 가져가시면 좋겠습니다. 직접 전달 가능합니다.",
        "photo": chair,
        "ago": "3시간 전",
        "viewCount": 31,
        "category": "가구/인테리어",
        "nickname": "닉네임 10",
        "wishCount": 6,
        "completionTime": "2025/03/13"
    }
]