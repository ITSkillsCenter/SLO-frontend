import React, { Component } from "react";
import Layout from "../../../layout/index";
import "./chat.css";

export default class Chat extends Component {
	render() {
		return (
			<div>
				<div>
					<div class="animation section-o">
						<div class="">
							<div class="">
								<div className="chatCon">
									<span className="inbox-head-chat">
										<span className="headActions1">
											<span>
												<i class="fa fa-comments inbox-head-fa"></i>
											</span>

											<span className="overal">
												<span className="overalspan1">Overall Messages</span>

												<span className="overalspan2">
													<span className="chat-num">1240</span> This month
												</span>
											</span>
										</span>
										<span className="headActions1">
											<span>
												<i class="fa fa-arrow-right inbox-head-fa"></i>
											</span>

											<span className="overal">
												<span className="overalspan1">Sent Messages</span>

												<span className="overalspan2">
													<span className="chat-num">1240</span> This month
												</span>
											</span>
										</span>
										<span className="headActions1">
											<span>
												<i class="fa fa-download inbox-head-fa"></i>
											</span>

											<span className="overal">
												<span className="overalspan1">Received Messages</span>

												<span className="overalspan2">
													<span className="chat-num">1240</span> This month
												</span>
											</span>
										</span>
									</span>

									<span className="head-section-two">
										<span className="head-section-two-input">
											<input placeholder="Search" type="text" />
											<span>
												<i class="fa fa-search search-Icon-Chat"></i>
											</span>
										</span>

										<span className="nextChatBlock">
											<span>
												<i class="fa fa-arrow-left"></i>
											</span>
											<span className="nextChatcount">10-50 Pages</span>
											<span>
												<i class="fa fa-arrow-right"></i>
											</span>
										</span>

										<span className="button-container">
											<button className="btn btn-sm btn-secondary">All</button>
											<button className="btn btn-sm btn-secondary">
												Unread
											</button>

											<button className="btn btn-sm btn-secondary">
												Important
											</button>
										</span>
									</span>
								</div>
								<div className="table-responsivee">
									<div
										onClick={() => this.props.AddnewChat()}
										className="openChat"
									>
										<i class="fa fa-plus"></i>
									</div>
									<table class="nowrap TaBle-chat table text-nowrap">
										<tbody>
											<tr
												onClick={() => this.props.OpenChat()}
												class="table-tr-chat tr"
											>
												<td>
													{" "}
													<input type="checkbox" name="" id="" />
												</td>
												<td className="td-chat">Joshua Welch</td>
												<td className="td-chat">
													<button className="btn btn-sm  extrchatblue">
														Group{" "}
													</button>
												</td>

												<td className="td-chat">App Development</td>
												<td className="td-chat">We need more hands on the </td>
												<td className="td-chat">15-10-2018 </td>
												<td className="td-chat">
													<i class="fa fa-ellipsis-v"></i>
												</td>
											</tr>
											<tr class="table-tr-chat tr">
												<td>
													{" "}
													<input type="checkbox" name="" id="" />
												</td>

												<td className="td-chat">Alan Randall</td>
												<td className="td-chat">
													<button className="btn btn-sm  extrchatred">
														Private
													</button>
												</td>

												<td className="td-chat">Personal</td>
												<td className="td-chat">We need more hands on the</td>
												<td className="td-chat">15-10-2018 </td>
												<td className="td-chat">
													<i class="fa fa-ellipsis-v"></i>
												</td>
											</tr>
											<tr class="table-tr-chat tr">
												<td>
													{" "}
													<input type="checkbox" name="" id="" />
												</td>

												<td className="td-chat">Jack Greene</td>
												<td className="td-chat">
													<button className="btn btn-sm  extrchatblue">
														Group{" "}
													</button>
												</td>

												<td className="td-chat">Slo App Team</td>
												<td className="td-chat">We need more hands on the</td>
												<td className="td-chat">15-10-2018</td>
												<td className="td-chat">
													<i class="fa fa-ellipsis-v"></i>
												</td>
											</tr>
											<tr class="table-tr-chat tr">
												<td>
													{" "}
													<input type="checkbox" name="" id="" />
												</td>
												<td className="td-chat">Sean Lawrence</td>
												<td className="td-chat">
													<button className="btn btn-sm  extrchatred">
														Private
													</button>
												</td>

												<td className="td-chat">Personal</td>
												<td className="td-chat">We need more hands on the</td>
												<td className="td-chat">15-10-2018</td>
												<td className="td-chat">
													<i class="fa fa-ellipsis-v"></i>
												</td>
											</tr>
											<tr class="table-tr-chat tr">
												<td>
													{" "}
													<input type="checkbox" name="" id="" />
												</td>
												<td className="td-chat">Sean Lawrence</td>
												<td className="td-chat">
													<button className="btn btn-sm  extrchatred">
														Private
													</button>
												</td>

												<td className="td-chat">Personal</td>
												<td className="td-chat">We need more hands on the</td>

												<td className="td-chat">15-10-2018</td>
												<td className="td-chat">
													<i class="fa fa-ellipsis-v"></i>
												</td>
											</tr>
											<tr class="table-tr-chat tr">
												<td>
													{" "}
													<input type="checkbox" name="" id="" />
												</td>
												<td className="td-chat">Sean Lawrence</td>
												<td className="td-chat">
													<button className="btn btn-sm  extrchatred">
														Private
													</button>
												</td>

												<td className="td-chat">Personal</td>
												<td className="td-chat">We need more hands on the</td>
												<td className="td-chat">15-10-2018</td>
												<td className="td-chat">
													<i class="fa fa-ellipsis-v"></i>
												</td>
											</tr>
											<tr class="table-tr-chat tr">
												<td>
													{" "}
													<input type="checkbox" name="" id="" />
												</td>
												<td className="td-chat">Sean Lawrence</td>
												<td className="td-chat">
													<button className="btn btn-sm  extrchatred">
														Private
													</button>
												</td>

												<td className="td-chat">Personal</td>
												<td className="td-chat">We need more hands on the</td>
												<td className="td-chat">15-10-2018</td>
												<td className="td-chat">
													<i class="fa fa-ellipsis-v"></i>
												</td>
											</tr>
											<tr class="table-tr-chat tr">
												<td>
													{" "}
													<input type="checkbox" name="" id="" />
												</td>
												<td className="td-chat">Oliver Welch</td>
												<td className="td-chat">
													<button className="btn btn-sm  extrchatblue">
														Group{" "}
													</button>
												</td>

												<td className="td-chat">Politics</td>
												<td className="td-chat">We need more hands on the</td>
												<td className="td-chat">15-10-2018 </td>
												<td className="td-chat">
													<i class="fa fa-ellipsis-v"></i>
												</td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
