import React from 'react';
import { encodeDirtyURL } from '../js/function';
export class Alert extends React.Component {
    render() {
        let icon;
        switch (this.props.icon) {
            case "error":
                icon = <i className="fas fa-exclamation-triangle mb-3"></i>;
                break;
            case "loading":
                icon = <i className="fas fa-circle-notch spin mb-3"></i>;
                break;
            default:
                break;
        }
        return (
            <div className="mt-auto mx-auto d-flex flex-column alert-container p-3">
                {icon}
                <h3>{this.props.heading}</h3>
                <p dangerouslySetInnerHTML={typeof (this.props.text) == 'object' ? this.props.text : null}>{typeof (this.props.text) == 'string' ? this.props.text : null}</p>
            </div>
        )
    }
}
export class HomeBanner extends React.Component {
    render() {
        let bg = {}, textBg;
        if (this.props["bg-img"]) bg = { backgroundImage: `url(/img${this.props["bg-img"]})` };
        textBg = { backgroundColor: this.props.siteMeta.colors.primary + "cc" }
        return (
            <div className="homebanner-container mb-component pos-r" style={bg}>
                <div className="bounding-box">
                    <div className="homebanner-texts d-flex flex-column" style={textBg}>
                        <h1 className="mb-3" dangerouslySetInnerHTML={typeof (this.props.heading) == 'object' ? this.props.heading : null}>{typeof (this.props.heading) == 'string' ? this.props.heading : null}</h1>
                        <p className="mb-5" dangerouslySetInnerHTML={typeof (this.props.text) == 'object' ? this.props.text : null}>{typeof (this.props.text) == 'string' ? this.props.text : null}</p>
                        <RouterLink cssClass="homebanner-btn" siteMeta={this.props.siteMeta} navigateHandler={this.props.navigateHandler} label={this.props.link.label} href={this.props.link.href} />
                    </div>
                </div>
                {this.props.imgCredit ? <RouterCreditLink siteMeta={this.props.siteMeta} navigateHandler={this.props.navigateHandler} imgCredit={this.props.imgCredit} /> : null}
            </div>
        )
    }
}
export class Stats extends React.Component {
    render() {
        let result = [];
        for (let stat of this.props.stats) {
            result.push(
                <div className="stat-item d-flex flex-column" key={stat.name + stat.number}>
                    <h2 className="">{stat.number}</h2>
                    <h4 className="">{stat.name}</h4>
                    <RouterLink cssClass="stat-item-link" siteMeta={this.props.siteMeta} navigateHandler={this.props.navigateHandler} label={`See all ${stat.name}`} href={stat.href} />
                </div>
            );
        }
        return (
            <div className="bounding-box mb-component">
                <div className="stat-container margin-responsive">
                    {result}
                </div>

            </div>
        )
    }
}
export class ItemSummary extends React.Component {
    render() {
        let backgroundImage = this.props.img ? `url(/img${this.props.img})` : "";
        return (
            <div className="bounding-box mb-component">
                <div className="margin-responsive padding-responsive d-flex flex-row">
                    {this.props.superHeading ? <h2 className="mb-0 py-3">{this.props.superHeading}</h2> : null}
                </div>
                <div className="margin-responsive ruler" />
                <div className="margin-responsive summary-container">
                    <div className="summary-text">
                        {this.props.heading ? <h3 className="mb-3" dangerouslySetInnerHTML={typeof (this.props.heading) == 'object' ? this.props.heading : null}>{typeof (this.props.heading) == 'string' ? this.props.heading : null}</h3> : null}
                        {this.props.sub ? <h5 className="mb-3" dangerouslySetInnerHTML={typeof (this.props.sub) == 'object' ? this.props.sub : null}>{typeof (this.props.sub) == 'string' ? this.props.sub : null}</h5> : null}
                        {this.props.text ? <p className="mb-3" dangerouslySetInnerHTML={typeof (this.props.text) == 'object' ? this.props.text : null}>{typeof (this.props.text) == 'string' ? this.props.text : null}</p> : null}
                        {this.props.href ? <RouterLink cssClass="summary-text-link" siteMeta={this.props.siteMeta} navigateHandler={this.props.navigateHandler} href={this.props.href} /> : null}
                    </div>
                    <div className="summary-items">
                        <div className="summary-img-span d-flex" style={{ backgroundImage: backgroundImage }}>
                            <img className="img-ghost" src={`/img${this.props.img}`} alt={this.props.alt} />
                            {this.props.imgCredit ? <RouterCreditLink siteMeta={this.props.siteMeta} navigateHandler={this.props.navigateHandler} imgCredit={this.props.imgCredit} /> : null}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export class ItemSummaryGroup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapse: this.props.collapsible ? true : false
        }
    }
    render() {
        let items = [], counter = 0;
        for (let item of this.props.items) {
            let backgroundImage = item.img ? `url(/img${item.img})` : "";
            items.push(
                <div className="margin-responsive summary-container" key={counter}>
                    <div className="summary-text">
                        {item.heading ? <h3 className="mb-3" dangerouslySetInnerHTML={typeof (item.heading) == 'object' ? item.heading : null}>{typeof (item.heading) == 'string' ? item.heading : null}</h3> : null}
                        {item.sub ? <h5 className="mb-3" dangerouslySetInnerHTML={typeof (item.sub) == 'object' ? item.sub : null}>{typeof (item.sub) == 'string' ? item.sub : null}</h5> : null}
                        {item.text ? <p className="mb-3" dangerouslySetInnerHTML={typeof (item.text) == 'object' ? item.text : null}>{typeof (item.text) == 'string' ? item.text : null}</p> : null}
                        {item.href ?
                            <RouterLink cssClass="summary-text-link" siteMeta={this.props.siteMeta} navigateHandler={this.props.navigateHandler} href={item.href} /> : null}
                    </div>
                    <div className="summary-items">
                        <div className="summary-img-span d-flex" style={{ backgroundImage: backgroundImage }}>
                            <img className="img-ghost" src={`/img${item.img}`} alt={item.alt} />
                            {item.imgCredit ? <RouterCreditLink siteMeta={this.props.siteMeta} navigateHandler={this.props.navigateHandler} imgCredit={item.imgCredit} /> : null}
                        </div>
                    </div>
                </div>
            );
            counter++;
        }

        return (
            <div className="bounding-box mb-component">
                <div className="margin-responsive padding-responsive d-flex flex-row">
                    {this.props.superHeading ? <h2 className="mb-0 py-3">{this.props.superHeading}</h2> : null}
                    {this.props.collapsible ? <button class="collapse-icon" title="toggle collapse" onClick={() => { this.setState({ collapse: !this.state.collapse }) }}><i class={`fas fa-${this.state.collapse ? "plus" : "minus"}`}></i></button> : null}
                </div>
                <div className="margin-responsive padding-responsive ruler" />
                {this.state.collapse ? null : items}
            </div>
        )
    }
}
export class TextGroup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapse: this.props.collapsible ? true : false
        }
    }
    render() {
        let texts = [], counter = 0;
        for (let text of this.props.texts) {
            texts.push(<p key={counter} dangerouslySetInnerHTML={typeof (text) == 'object' ? text : null}>{typeof (text) == 'string' ? text : null}</p>);
            counter++;
        }
        return (
            <div className="bounding-box mb-component">
                <div className="margin-responsive padding-responsive d-flex flex-row">
                    {this.props.superHeading ? <h2 className="mb-0 py-3">{this.props.superHeading}</h2> : null}
                    {this.props.collapsible ? <button class="collapse-icon" title="toggle collapse" onClick={() => { this.setState({ collapse: !this.state.collapse }) }}><i class={`fas fa-${this.state.collapse ? "plus" : "minus"}`}></i></button> : null}
                </div>
                <div className="margin-responsive padding-responsive ruler" />
                {this.state.collapse ? null : <div className="margin-responsive textGroup-container padding-responsive">
                    {this.props.heading ? <h3 className="mb-3" dangerouslySetInnerHTML={typeof (this.props.heading) == 'object' ? this.props.heading : null}>{typeof (this.props.heading) == 'string' ? this.props.heading : null}</h3> : null}
                    {this.props.sub ? <h5 className="mb-4" dangerouslySetInnerHTML={typeof (this.props.sub) == 'object' ? this.props.sub : null}>{typeof (this.props.sub) == 'string' ? this.props.sub : null}</h5> : null}
                    {this.props.intro ? <p className="mb-4" dangerouslySetInnerHTML={typeof (this.props.intro) == 'object' ? this.props.intro : null}>{typeof (this.props.intro) == 'string' ? this.props.intro : null}</p> : null}
                    <div className="textGroup-group">
                        {this.state.collapse ? null : texts}
                    </div>
                </div>}
            </div>
        )
    }
}
export class TextSection extends React.Component {
    render() {
        return (
            <div className="bounding-box mb-component">
                <div className="margin-responsive padding-responsive d-flex flex-row">
                    {this.props.superHeading ? <h2 className="mb-0 py-3">{this.props.superHeading}</h2> : null}
                </div>
                <div className="margin-responsive padding-responsive ruler" />
                <div className="margin-responsive textSection-container padding-responsive d-flex flex-column">
                    {this.props.heading ? <h3 className="mb-3" dangerouslySetInnerHTML={typeof (this.props.heading) == 'object' ? this.props.heading : null}>{typeof (this.props.heading) == 'string' ? this.props.heading : null}</h3> : null}
                    {this.props.sub ? <h5 className="mb-4" dangerouslySetInnerHTML={typeof (this.props.sub) == 'object' ? this.props.sub : null}>{typeof (this.props.sub) == 'string' ? this.props.sub : null}</h5> : null}
                    {this.props.text ? <p className="mb-0" dangerouslySetInnerHTML={typeof (this.props.text) == 'object' ? this.props.text : null}>{typeof (this.props.text) == 'string' ? this.props.text : null}</p> : null}
                    {this.props.href ? <RouterLink cssClass=" textSection-container-link mt-3" siteMeta={this.props.siteMeta} navigateHandler={this.props.navigateHandler} href={this.props.href} /> : null}
                </div>
            </div>
        )
    }
}
export class TextSectionPair extends React.Component {
    render() {
        return (
            <div className="bounding-box mb-component">
                <div className="margin-responsive padding-responsive d-flex flex-row">
                    {this.props.superHeading ? <h2 className="mb-0 py-3">{this.props.superHeading}</h2> : null}
                </div>
                <div className="margin-responsive padding-responsive ruler" />
                <div className="margin-responsive textSection-container padding-responsive textSectionPair-container">
                    <div className="mr-3 d-flex flex-column">
                        {this.props.first.heading ? <h3 className="mb-3" dangerouslySetInnerHTML={typeof (this.props.first.heading) == 'object' ? this.props.first.heading : null}>{typeof (this.props.first.heading) == 'string' ? this.props.first.heading : null}</h3> : null}
                        {this.props.first.sub ? <h5 className="mb-4" dangerouslySetInnerHTML={typeof (this.props.first.sub) == 'object' ? this.props.first.sub : null}>{typeof (this.props.first.sub) == 'string' ? this.props.first.sub : null}</h5> : null}
                        {this.props.first.text ? <p className="mb-3" dangerouslySetInnerHTML={typeof (this.props.first.text) == 'object' ? this.props.first.text : null}>{typeof (this.props.first.text) == 'string' ? this.props.first.text : null}</p> : null}
                        {this.props.first.href ?
                            <RouterLink cssClass="textSection-container-link mt-auto" siteMeta={this.props.siteMeta} navigateHandler={this.props.navigateHandler} href={this.props.first.href} /> : null}
                    </div>
                    <div className="mb-0 d-flex flex-column">
                        {this.props.second.heading ? <h3 className="mb-3" dangerouslySetInnerHTML={typeof (this.props.second.heading) == 'object' ? this.props.second.heading : null}>{typeof (this.props.second.heading) == 'string' ? this.props.second.heading : null}</h3> : null}
                        {this.props.second.sub ? <h5 className="mb-4" dangerouslySetInnerHTML={typeof (this.props.second.sub) == 'object' ? this.props.second.sub : null}>{typeof (this.props.second.sub) == 'string' ? this.props.second.sub : null}</h5> : null}
                        {this.props.second.text ? <p className="mb-3" dangerouslySetInnerHTML={typeof (this.props.second.text) == 'object' ? this.props.second.text : null}>{typeof (this.props.second.text) == 'string' ? this.props.second.text : null}</p> : null}
                        {this.props.second.href ? <RouterLink cssClass="textSection-container-link mt-auto" siteMeta={this.props.siteMeta} navigateHandler={this.props.navigateHandler} href={this.props.second.href} /> : null}
                    </div>
                </div>
            </div>
        )
    }
}
export class TextSectionImg extends React.Component {
    render() {
        let backgroundImage = this.props.img ? `url(/img${this.props.img})` : "";
        return (
            <div className="bounding-box mb-component">
                <div className="margin-responsive padding-responsive d-flex flex-row">
                    {this.props.superHeading ? <h2 className="mb-0 py-3">{this.props.superHeading}</h2> : null}
                </div>
                <div className="margin-responsive padding-responsive ruler" />
                <div className="margin-responsive textSectionImg-container padding-responsive">
                    {this.props.heading ? <h3 className="mb-3" dangerouslySetInnerHTML={typeof (this.props.heading) == 'object' ? this.props.heading : null}>{typeof (this.props.heading) == 'string' ? this.props.heading : null}</h3> : null}
                    {this.props.sub ? <h5 className="mb-4" dangerouslySetInnerHTML={typeof (this.props.sub) == 'object' ? this.props.sub : null}>{typeof (this.props.sub) == 'string' ? this.props.sub : null}</h5> : null}
                    <div className="textSectionImg-section">
                        {this.props.text ? <p className="" dangerouslySetInnerHTML={typeof (this.props.text) == 'object' ? this.props.text : null}>{typeof (this.props.text) == 'string' ? this.props.text : null}</p> : null}
                        <div className="textSectionImg-img-span d-flex" style={{ backgroundImage: backgroundImage }}>
                            <img className="img-ghost" src={`/img${this.props.img}`} alt={this.props.alt} />
                            {this.props.imgCredit ? <RouterCreditLink siteMeta={this.props.siteMeta} navigateHandler={this.props.navigateHandler} imgCredit={this.props.imgCredit} /> : null}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export class TextSectionImgGroup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapse: this.props.collapsible ? true : false
        }
    }
    render() {
        let sections = [], counter = 0;
        for (let section of this.props.sections) {
            let backgroundImage = section.img ? `url(/img${section.img})` : "";
            sections.push(
                <div className="margin-responsive textSectionImg-container padding-responsive" key={counter} style={counter != 0 ? { borderTop: "none" } : {}}>
                    {section.heading ? <h3 className="mb-3" dangerouslySetInnerHTML={typeof (section.heading) == 'object' ? section.heading : null}>{typeof (section.heading) == 'string' ? section.heading : null}</h3> : null}

                    {section.sub ? <h5 className="mb-4" dangerouslySetInnerHTML={typeof (section.sub) == 'object' ? section.sub : null}>{typeof (section.sub) == 'string' ? section.sub : null}</h5> : null}
                    <div className="textSectionImg-section">
                        {section.text ? <p className="" dangerouslySetInnerHTML={typeof (section.text) == 'object' ? section.text : null}>{typeof (section.text) == 'string' ? section.text : null}</p> : null}
                        <div className="textSectionImg-img-span d-flex" style={{ backgroundImage: backgroundImage }}>
                            <img className="img-ghost" src={`/img${section.img}`} alt={section.alt} />
                            {section.imgCredit ? <RouterCreditLink siteMeta={this.props.siteMeta} navigateHandler={this.props.navigateHandler} imgCredit={section.imgCredit} /> : null}
                        </div>
                    </div>
                </div>
            );
            counter++;
        }
        return (
            <div className="bounding-box mb-component">
                <div className="margin-responsive padding-responsive d-flex flex-row">
                    {this.props.superHeading ? <h2 className="mb-0 py-3">{this.props.superHeading}</h2> : null}
                    {this.props.collapsible ? <button class="collapse-icon" title="toggle collapse" onClick={() => { this.setState({ collapse: !this.state.collapse }) }}><i class={`fas fa-${this.state.collapse ? "plus" : "minus"}`}></i></button> : null}
                </div>
                <div className="margin-responsive padding-responsive ruler" />
                {this.state.collapse ? null : sections}
            </div>
        )
    }
}
export class ItemGroup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapse: this.props.collapsible ? true : false
        }
    }
    render() {
        let items = [], counter = 0;
        for (let item of this.props.items) {
            let backgroundImage = item.img ? `url(/img${item.img})` : "";
            items.push(
                <div className="itemGroup-item d-flex flex-row" key={counter}>
                    <div className="summary-item-img d-flex" style={{ backgroundColor: "black", backgroundImage: backgroundImage }}>
                        <img className="img-ghost" src={`/img${item.img}`} alt={item.alt} />
                        {item.imgCredit ? <RouterCreditLink siteMeta={this.props.siteMeta} navigateHandler={this.props.navigateHandler} imgCredit={item.imgCredit} /> : null}
                    </div>
                    <div className="py-2 d-flex flex-column">
                        <h6 className="mb-2" dangerouslySetInnerHTML={typeof (item.heading) == 'object' ? item.heading : null}>{typeof (item.heading) == 'string' ? item.heading : null}</h6>
                        {item.sub ? <p className="mb-3 op-05 fs-09" dangerouslySetInnerHTML={typeof (item.sub) == 'object' ? item.sub : null}>{typeof (item.sub) == 'string' ? item.sub : null}</p> : null}

                        <RouterLink cssClass="mt-auto summary-item-button" label="View Details" siteMeta={this.props.siteMeta} navigateHandler={this.props.navigateHandler} href={item.href} />
                    </div>

                </div>
            );
            counter++;
        }
        return (
            <div className="bounding-box mb-component">
                <div className="margin-responsive padding-responsive d-flex flex-row">
                    {this.props.superHeading ? <h2 className="mb-0 py-3">{this.props.superHeading}</h2> : null}
                    {this.props.collapsible ? <button class="collapse-icon" title="toggle collapse" onClick={() => { this.setState({ collapse: !this.state.collapse }) }}><i class={`fas fa-${this.state.collapse ? "plus" : "minus"}`}></i></button> : null}
                </div>
                <div className="margin-responsive padding-responsive ruler" />
                {this.state.collapse ? null : <div className="margin-responsive itemGroup-container padding-responsive">
                    {this.props.heading ? <h3 className="mb-3" dangerouslySetInnerHTML={typeof (this.props.heading) == 'object' ? this.props.heading : null}>{typeof (this.props.heading) == 'string' ? this.props.heading : null}</h3> : null}
                    {this.props.sub ? <h5 className="mb-4 op-05" dangerouslySetInnerHTML={typeof (this.props.sub) == 'object' ? this.props.sub : null}>{typeof (this.props.sub) == 'string' ? this.props.sub : null}</h5> : null}
                    <div className="itemGroup-items">
                        {this.state.collapse ? null : items}
                    </div>
                </div>}
            </div>
        )
    }
}
export class ItemGroupSummary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapse: this.props.collapsible ? true : false
        }
    }
    render() {
        let items = [], counter = 0;
        for (let item of this.props.items) {
            let backgroundImage = item.img ? `url(/img${item.img})` : "";
            items.push(
                <div className="summary-item d-flex flex-row" key={counter}>
                    <div className="summary-item-img d-flex" style={{ backgroundColor: "black", backgroundImage: backgroundImage }}>
                        <img className="img-ghost" src={`/img${item.img}`} alt={item.alt} />
                        {item.imgCredit ? <RouterCreditLink siteMeta={this.props.siteMeta} navigateHandler={this.props.navigateHandler} imgCredit={item.imgCredit} /> : null}
                    </div>
                    <div className="py-2 d-flex flex-column">
                        <h6 className="mb-2" dangerouslySetInnerHTML={typeof (item.heading) == 'object' ? item.heading : null}>{typeof (item.heading) == 'string' ? item.heading : null}</h6>
                        {item.sub ? <p className="mb-3 op-05 fs-09" dangerouslySetInnerHTML={typeof (item.sub) == 'object' ? item.sub : null}>{typeof (item.sub) == 'string' ? item.sub : null}</p> : null}
                        <RouterLink cssClass="mt-auto summary-item-button" label="View Details" siteMeta={this.props.siteMeta} navigateHandler={this.props.navigateHandler} href={item.href} />
                    </div>

                </div>
            );
            counter++;
        }
        return (
            <div className="bounding-box mb-component">
                <div className="margin-responsive padding-responsive d-flex flex-row">
                    {this.props.superHeading ? <h2 className="mb-0 py-3">{this.props.superHeading}</h2> : null}
                    {this.props.collapsible ? <button class="collapse-icon" title="toggle collapse" onClick={() => { this.setState({ collapse: !this.state.collapse }) }}><i class={`fas fa-${this.state.collapse ? "plus" : "minus"}`}></i></button> : null}
                </div>
                <div className="margin-responsive padding-responsive ruler" />
                {this.state.collapse ? null : <div className="margin-responsive summary-container">
                    <div className="summary-text">
                        {this.props.heading ? <h3 className="mb-3" dangerouslySetInnerHTML={typeof (this.props.heading) == 'object' ? this.props.heading : null}>{typeof (this.props.heading) == 'string' ? this.props.heading : null}</h3> : null}
                        {this.props.sub ? <h5 className="mb-3" dangerouslySetInnerHTML={typeof (this.props.sub) == 'object' ? this.props.sub : null}>{typeof (this.props.sub) == 'string' ? this.props.sub : null}</h5> : null}
                        {this.props.text ? <p className="mb-3" dangerouslySetInnerHTML={typeof (this.props.text) == 'object' ? this.props.text : null}>{typeof (this.props.text) == 'string' ? this.props.text : null}</p> : null}
                        {this.props.href ?
                            <RouterLink cssClass="summary-text-link" siteMeta={this.props.siteMeta} navigateHandler={this.props.navigateHandler} href={this.props.href} /> : null}
                    </div>
                    <div className="summary-items">
                        {items}
                    </div>
                </div>}
            </div>
        )
    }
}
export class PeopleGroup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapse: this.props.collapsible ? true : false
        }
    }
    render() {
        let people = [], counter = 0;
        for (let person of this.props.people) {
            let backgroundImage = person.img ? `url(/img${person.img})` : "";
            let links = [];
            if (person.links) {
                for (let link of person.links) {
                    links.push(
                        <RouterLink cssClass="peopleGroup-link-item" siteMeta={this.props.siteMeta} navigateHandler={this.props.navigateHandler} href={link.href} label={link.label} key={link.label} />
                    );
                }
            }

            people.push(
                <div className="peopleGroup-person d-flex flex-column" key={counter}>
                    <div className="d-flex flex-row mb-3">
                        <div className="peopleGroup-img" style={{ backgroundColor: "black", backgroundImage: backgroundImage }}></div>
                        <div className="py-2 my-auto d-flex flex-column">
                            <h4 className="mb-2 " dangerouslySetInnerHTML={typeof (person.name) == 'object' ? person.name : null}>{typeof (person.name) == 'string' ? person.name : null}</h4>
                            {person.title ? <h6 className="mb-3 op-05 " dangerouslySetInnerHTML={typeof (person.title) == 'object' ? person.title : null}>{typeof (person.title) == 'string' ? person.title : null}</h6> : null}
                        </div>
                    </div>
                    <p className="mb-0" dangerouslySetInnerHTML={typeof (person.bio) == 'object' ? person.bio : null}>{typeof (person.bio) == 'string' ? person.bio : null}</p>
                    <div className="d-flex flex-column">
                        {links}
                    </div>
                </div>
            );
            counter++;
        }
        return (
            <div className="bounding-box mb-component">
                <div className="margin-responsive padding-responsive d-flex flex-row">
                    {this.props.superHeading ? <h2 className="mb-0 py-3">{this.props.superHeading}</h2> : null}
                    {this.props.collapsible ? <button class="collapse-icon" title="toggle collapse" onClick={() => { this.setState({ collapse: !this.state.collapse }) }}><i class={`fas fa-${this.state.collapse ? "plus" : "minus"}`}></i></button> : null}
                </div>
                <div className="margin-responsive padding-responsive ruler" />
                {this.state.collapse ? null : <div className="margin-responsive peopleGroup-container padding-responsive">
                    {this.props.heading ? <h3 className="mb-3" dangerouslySetInnerHTML={typeof (this.props.heading) == 'object' ? this.props.heading : null}>{typeof (this.props.heading) == 'string' ? this.props.heading : null}</h3> : null}
                    {this.props.sub ? <h5 className="mb-3 op-05" dangerouslySetInnerHTML={typeof (this.props.sub) == 'object' ? this.props.sub : null}>{typeof (this.props.sub) == 'string' ? this.props.sub : null}</h5> : null}
                    <div className="peopleGroup-people">
                        {this.state.collapse ? null : people}
                    </div>
                </div>}
            </div>
        )
    }
}
export class LinkGroup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapse: this.props.collapsible ? true : false
        }
    }
    render() {
        let links = [], counter = 0;
        for (let link of this.props.links) {
            links.push(
                <div className="linkGroup-item" key={counter}>
                    <h5 className="">{link.title}</h5>
                    <p className="op-05" dangerouslySetInnerHTML={typeof (link.sub) == 'object' ? link.sub : null}>{typeof (link.sub) == 'string' ? link.sub : null}</p>
                    {link.href ? <RouterLink cssClass="linkGroup-item-link mt-auto" siteMeta={this.props.siteMeta} navigateHandler={this.props.navigateHandler} href={link.href} /> : null}
                </div>

            );
            counter++;
        }
        return (
            <div className="bounding-box mb-component">
                <div className="margin-responsive padding-responsive d-flex flex-row">
                    {this.props.superHeading ? <h2 className="mb-0 py-3">{this.props.superHeading}</h2> : null}
                    {this.props.collapsible ? <button class="collapse-icon" title="toggle collapse" onClick={() => { this.setState({ collapse: !this.state.collapse }) }}><i class={`fas fa-${this.state.collapse ? "plus" : "minus"}`}></i></button> : null}
                </div>
                <div className="margin-responsive padding-responsive ruler" />
                {this.state.collapse ? null : <div className="margin-responsive textGroup-container padding-responsive">
                    {this.props.heading ? <h3 className="mb-3" dangerouslySetInnerHTML={typeof (this.props.heading) == 'object' ? this.props.heading : null}>{typeof (this.props.heading) == 'string' ? this.props.heading : null}</h3> : null}
                    {this.props.sub ? <h5 className="mb-4" dangerouslySetInnerHTML={typeof (this.props.sub) == 'object' ? this.props.sub : null}>{typeof (this.props.sub) == 'string' ? this.props.sub : null}</h5> : null}
                    {this.props.intro ? <p className="mb-4" dangerouslySetInnerHTML={typeof (this.props.intro) == 'object' ? this.props.intro : null}>{typeof (this.props.intro) == 'string' ? this.props.intro : null}</p> : null}
                    <div className="linkGroup-group">
                        {this.state.collapse ? null : links}
                    </div>
                </div>}
            </div>
        )
    }
}
export class Heading extends React.Component {
    render() {
        return (
            <div className="bounding-box">
                <h2 className="margin-responsive padding-responsive mb-0 py-3">{this.props.heading}</h2>
            </div>
        )
    }
}
export class TextSectionTabs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tab: 0
        }
    }
    render() {
        let tabs = [], counter = 0;
        for (let tab of this.props.tabs) {
            let current = counter;
            tabs.push(
                <button className={`${this.state.tab == current ? "highlight-bg" : ""}`} key={counter} onClick={() => { this.state.tab != current ? this.setState({ tab: current }) : "" }}>{tab.name}</button>
            );
            counter++;
        }
        return (
            <div className="bounding-box mb-component">
                <div className="margin-responsive padding-responsive d-flex flex-row">
                    {this.props.superHeading ? <h2 className="mb-0 py-3">{this.props.superHeading}</h2> : null}
                </div>
                <div className="margin-responsive padding-responsive ruler" />
                <div className="margin-responsive padding-responsive textSectionTabs-container">
                    {this.props.heading ? <h3 className="mb-3" dangerouslySetInnerHTML={typeof (this.props.heading) == 'object' ? this.props.heading : null}>{typeof (this.props.heading) == 'string' ? this.props.heading : null}</h3> : null}
                    {this.props.sub ? <h5 className="mb-4" dangerouslySetInnerHTML={typeof (this.props.sub) == 'object' ? this.props.sub : null}>{typeof (this.props.sub) == 'string' ? this.props.sub : null}</h5> : null}
                    <div className="textSectionTabs-tabs">
                        {tabs}
                    </div>
                    <p className="textSectionTabs-content" dangerouslySetInnerHTML={typeof (this.props.tabs[this.state.tab].content) == 'object' ? this.props.tabs[this.state.tab].content : null}>
                        {typeof (this.props.tabs[this.state.tab].content) == 'string' ? this.props.tabs[this.state.tab].content : null}
                    </p>
                </div>
            </div>
        )
    }
}
export class TextImgCascade extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapse: this.props.collapsible ? true : false
        }
    }
    render() {
        let cascade = [], counter = 0;
        for (let x of this.props.cascade) {
            if (x.type == 'text') {
                cascade.push(
                    <p className="mb-3" dangerouslySetInnerHTML={typeof (x.text) == 'object' ? x.text : null} key={counter}>{typeof (x.text) == 'string' ? x.text : null}</p>
                );
            }
            else if (x.type == 'image') {
                cascade.push(
                    <div className="d-flex flex-column mb-3" key={counter}>
                        <div className="pos-r mb-2">
                            <img className="textImgCascade-img" alt={x.alt} src={"/img" + x.src} />
                            {x.imgCredit ?
                                <RouterCreditLink cssClass="imgCredit-abs" siteMeta={this.props.siteMeta} navigateHandler={this.props.navigateHandler} imgCredit={x.imgCredit} /> : null}
                        </div>

                        <h6 className="op-05 mx-auto mb-0">{x.title}</h6>
                    </div>
                )
            }
            counter++;
        }
        return (
            <div className="bounding-box mb-component">
                <div className="margin-responsive padding-responsive d-flex flex-row">
                    {this.props.superHeading ? <h2 className="mb-0 py-3">{this.props.superHeading}</h2> : null}
                    {this.props.collapsible ? <button class="collapse-icon" title="toggle collapse" onClick={() => { this.setState({ collapse: !this.state.collapse }) }}><i class={`fas fa-${this.state.collapse ? "plus" : "minus"}`}></i></button> : null}
                </div>
                <div className="margin-responsive padding-responsive ruler" />
                {this.state.collapse ? null : <div className="margin-responsive py-4 padding-responsive">
                    {this.props.heading ? <h3 className="mb-3" dangerouslySetInnerHTML={typeof (this.props.heading) == 'object' ? this.props.heading : null}>{typeof (this.props.heading) == 'string' ? this.props.heading : null}</h3> : null}
                    {this.props.sub ? <h5 className="mb-4 op-05" dangerouslySetInnerHTML={typeof (this.props.sub) == 'object' ? this.props.sub : null}>{typeof (this.props.sub) == 'string' ? this.props.sub : null}</h5> : null}
                    {cascade}
                </div>}
            </div>
        )
    }
}
export class ImgRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapse: this.props.collapsible ? true : false
        }
    }
    render() {
        let images = [], counter = 0;
        for (let x of this.props.images) {
            images.push(
                <div className="d-flex flex-column m-3" key={counter}>
                    <div className="pos-r mb-2">
                        <img className="imgRow-img" alt={x.alt} src={"/img" + x.src} />
                        {x.imgCredit ? <RouterCreditLink cssClass="imgCredit-abs" siteMeta={this.props.siteMeta} navigateHandler={this.props.navigateHandler} imgCredit={x.imgCredit} /> : null}
                    </div>
                    <h6 className="op-05 mx-auto mb-0">{x.title}</h6>
                </div>
            )
            counter++;
        }
        return (
            <div className="bounding-box mb-component">
                <div className="margin-responsive padding-responsive d-flex flex-row">
                    {this.props.superHeading ? <h2 className="mb-0 py-3">{this.props.superHeading}</h2> : null}
                    {this.props.collapsible ? <button class="collapse-icon" title="toggle collapse" onClick={() => { this.setState({ collapse: !this.state.collapse }) }}><i class={`fas fa-${this.state.collapse ? "plus" : "minus"}`}></i></button> : null}
                </div>
                <div className="margin-responsive padding-responsive ruler" />
                {this.state.collapse ? null : <div className="margin-responsive py-4 padding-responsive">
                    {this.props.heading ? <h3 className="mb-3" dangerouslySetInnerHTML={typeof (this.props.heading) == 'object' ? this.props.heading : null}>{typeof (this.props.heading) == 'string' ? this.props.heading : null}</h3> : null}
                    {this.props.sub ? <h5 className="mb-4 op-05" dangerouslySetInnerHTML={typeof (this.props.sub) == 'object' ? this.props.sub : null}>{typeof (this.props.sub) == 'string' ? this.props.sub : null}</h5> : null}
                    <div className="d-flex flex-row imgRow-container">{images}</div>
                </div>}
            </div>
        )
    }
}
export class Dummy extends React.Component {
    render() {
        return (
            <div className="bounding-box mb-component">
            </div>
        )
    }
}
class RouterLink extends React.Component {
    render() {
        let href = encodeDirtyURL(this.props.href);
        let proto = this.props.href.substring(0, 4).toLowerCase();
        if (proto == 'html') href = this.props.href;
        else if (proto == 'file') {
            let regexp = /FILE\((.+)\)/;
            let realPath = encodeDirtyURL(this.props.href).match(regexp)[1];
            href = "/file" + realPath;
        }

        return (
            <a className={"fc-h " + (this.props.cssClass ? this.props.cssClass : "")} href={href} onClick={(e) => {
                if (e.button == 0) {
                    e.preventDefault();
                    this.props.navigateHandler(encodeDirtyURL(this.props.href))
                }
            }}>{this.props.label ? this.props.label : "Learn more"}<i className="fas fa-chevron-right fs-08 ml-2"></i></a>
        )
    }
}
class RouterCreditLink extends React.Component {
    render() {
        let href = encodeDirtyURL(this.props.imgCredit.href);
        let proto = this.props.imgCredit.href.substring(0, 4).toLowerCase();
        if (proto == 'html') href = this.props.imgCredit.href;
        else if (proto == 'file') {
            let regexp = /FILE\((.+)\)/;
            let realPath = encodeDirtyURL(this.props.imgCredit.href).match(regexp)[1];
            href = "/file" + realPath;
        }
        return (
            <a className={"imgCredit imgCredit-abs " + (this.props.cssClass ? this.props.cssClass : "")} href={href} onClick={(e) => {
                if (e.button == 0) {
                    e.preventDefault();
                    this.props.navigateHandler(encodeDirtyURL(this.props.imgCredit.href))
                }
            }}>{this.props.imgCredit.credit}</a>
        )
    }
}