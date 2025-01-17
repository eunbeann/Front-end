import React, {useEffect, useState} from "react";
import './Select.css';
import {Form, CloseButton, Button} from 'react-bootstrap';
import {ReactComponent as Refresh} from './Refresh.svg';
import ImgBox from '../ImgBox/ImgBox';
import axios from 'axios'

function Select() {
    const program = [
        "Back-end(백엔드)",
        "Bootcamp Prep(부트캠프 프랩)",
        "Data analysis(데이터 분석, 빅데이터)",
        "Software Development(소프트웨어 개발)",
        "Algorithm(알고리즘)",
        "Cloud(클라우드)",
        "Portfolio(포트폴리오)",
        "Full Stack(풀스택)",
        "Front-end(프론트엔드)",
        "AI(인공지능)",
        "Android",
        "iOS",
        "Web",
        "3D Graphics",
        "이론",
        "Intelligent Robots(지능로봇)",
        "IOT(사물인터넷)",
        "Block Chain(블록체인)",
        "Virtual Reality(가상현실)",
        "DevOps",
        "Embedded(임베디드)",
        "Security(보안)",
        "3D printing",
        "PM(프로덕트매니지먼트)",
        "기타"
    ];
    const skill = [
        "Python",
        "Jupyter",
        "Django",
        "HTML",
        "CSS",
        "JavaScript",
        "Ruby",
        "JQuery",
        "React",
        "Docker",
        "Android",
        "Azure",
        "R",
        "JSP",
        "Ajax",
        "SpringBoot",
        "Json",
        "Arduino",
        "C++",
        "Linux",
        "C",
        "C#",
        "Unix",
        "DB",
        "Git",
        "SQL",
        "GitHub",
        "ReactNative",
        "Kotlin",
        "XML",
        "Swift",
        "Unitiy",
        "KoNLpy",
        "PyTorch",
        "LinuxCLI",
        "Elasticsearch",
        "Spark",
        "Hadoop",
        "Tensorflow",
        "JDBC",
        "JPA",
        "AWS",
        "VanillaJS",
        "Firebase",
        "Vue",
        "Oracle",
        "Node.JS",
        "Mybatis",
        "MongoDB",
        "Vue.JS",
        "Keras",
        "Gcp",
        "HTTP",
        "DOM",
        "Flask",
        "Typescript",
        "MySQL",
        "PHP",
        "Kubernes",
        "Klaytn",
        "Excel",
        "ROKITBrick",
        "Nest",
        "AI",
        "PM",
        "BlockChain",
        "Dogma",
        "Sketch"
    ];
    const recruit = ["모집중", "모집완료", "모집예정"];
    const onoff = ["온라인", "오프라인", "온/오프라인 병행"];
    const card = ["국민내일배움카드 X", "국민내일배움카드 필수", "국민내일배움카드 선택사항"];

    const [Selected, setSelected] = useState([]);
    const [Reset, setReset] = useState(false);
    const [query, setQuery] = useState(" ");
    const [data, setData] = useState([]);
    let queryTemp = "";


    const selectedCheck = (id) => {
        if (Selected.find((Selected) => Selected === id)) {
            return 0;
        } else 
            return 1;
        };

    const handleChangeSelect = (event) => {

        if (selectedCheck(event.target.value) === 1) {
            setSelected((current) => [
                ...current,
                (event.target.value)
            ]);

            if(query === " " || query === "")
            { setQuery(event.target.value);}
            else{ setQuery(query+"&"+(event.target.value));}

            setReset(true);
        }
    }

    const reset = () => {
        setSelected([]);
        setQuery(" ");
        setData([]);
        setReset(false);
    }

    const cancle = (id) => {
        setSelected(Selected.filter(Selected => Selected !== id));
        queryTemp = Selected.filter(Selected => Selected !== id).join('&');
        setQuery(queryTemp);
    };
    

    useEffect(() => {
        let completed = false;
        
        console.log(query);

        if (query === " " || query === "") {
            setData([]);
            return;
        }

        async function get() {
            // program=front-end&tech_stack=css
            const result = await axios(`http://ec2-13-209-65-110.ap-northeast-2.compute.amazonaws.com:8000/api/bootcamp/option/?${query}`)
            if (!completed) {
                setData(result.data);
            }
        }
        get()
        return() => {
            completed = true
        }
    }, [query])

    //console.log(data);

    return (
        <div>
            <div className="container" id="select-container">
                <div className="select-box">
                    <Form.Select
                        size="sm"
                        className="select-option"
                        aria-label="Default select example"
                        onChange={handleChangeSelect}>
                        <option value="" disabled="disabled" selected="selected">해당 프로그램 분야</option>
                        {
                            program.map((item) => (
                                <option id={"program=" + item} value={`program=${item}`} key={item}>
                                    {item}
                                </option>
                            ))
                        }
                    </Form.Select>
                    <Form.Select
                        size="sm"
                        className="select-option"
                        aria-label="Default select example"
                        onChange={handleChangeSelect}>
                        <option value="" disabled="disabled" selected="selected">기술 스택</option>
                        {
                            skill.map((item) => (
                                <option id={"skill=" + item} value={`tech_stack=${item}`} key={item}>
                                    {item}
                                </option>
                            ))
                        }
                    </Form.Select>
                    <Form.Select
                        size="sm"
                        className="select-option"
                        aria-label="Default select example"
                        onChange={handleChangeSelect}>
                        <option value="" disabled="disabled" selected="selected">모집 여부</option>
                        {
                            recruit.map((item) => (
                                <option id={"recruit" + item} value={`accept=${item}`} key={item}>
                                    {item}
                                </option>
                            ))
                        }
                    </Form.Select>
                    <Form.Select
                        size="sm"
                        className="select-option"
                        aria-label="Default select example"
                        onChange={handleChangeSelect}>
                        <option value="" disabled="disabled" selected="selected">온/오프라인</option>
                        {
                            onoff.map((item) => (
                                <option id={"onoff" + item} value={`on_offline=${item}`} key={item}>
                                    {item}
                                </option>
                            ))
                        }
                    </Form.Select>
                    <Form.Select
                        size="sm"
                        className="select-option"
                        aria-label="Default select example"
                        onChange={handleChangeSelect}>
                        <option value="" disabled="disabled" selected="selected">국민내일배움카드 여부</option>
                        {
                            card.map((item) => (
                                <option id={"card" + item} value={`k_digital=${item}`} key={item}>
                                    {item}
                                </option>
                            ))
                        }
                    </Form.Select>
                </div>

                <div className="optionbox">
                    <div className="selecttags">
                        {
                            Selected.map((selectTags) => (
                                <Button variant="outline-light" className="option">
                                    {
                                        selectTags
                                            .split('=')[1]
                                    }
                                    <CloseButton
                                        onClick={() => cancle(selectTags)}
                                        className="cancle"
                                        aria-label="Hide"/>
                                </Button>
                            ))
                        }
                        {
                            (Reset === false || Selected.length === 0)
                                ? null
                                : <Refresh onClick={reset} className="resetbutton"/>
                        }
                    </div>
                </div>
                <div className='img-box'><ImgBox data={data}/></div>
            </div>
        </div>
    );
}

export default Select;